const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const player = require("../../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song from YouTube.")
    .addStringOption((option) =>
      option
        .setName("sonngtitle")
        .setDescription("Enter a song title to play it for you :)")
        .setRequired(true)
    ),
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const songTitle = interaction.options.getString("songtitle");

    if (!interaction.member.voice.channel)
      return interaction.followUp({
        content: "Please join a voice channel first!",
      });

    const searchResult = await player.search(songTitle, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    const queue = await player.createQueue(interaction.guild, {
      metadata: interaction.channel,
    });

    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    interaction.followUp({ content: `Playing ${songTitle}` });

    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
