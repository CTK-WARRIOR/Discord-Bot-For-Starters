const { MessageEmbed } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    name: 'weather',
    description: 'Send weather information of any country or state.',
    run: async (client, message, args) => {
        let city = args.join(' ');
        let degreetype = "F";

        await weather.find({
            search: city,
            degreetype: degreetype
        },
        function (err, result) {
            if (!city) {
                let embed = new MessageEmbed()
                .setColor('RED')
                .setTitle('Wrong command format.')
                .setDescription("<:error:896718126991966269> Please enter a City or it's State.")
                .setTimestamp()
                return message.channel.send(embed);
            }

            let current = result[0].current;
            let location = result[0].location;

            const embed2 = new MessageEmbed()
            .setAuthor(current.observationpoint)
            .setDescription(`\`\`\`Type of weather: ${current.skytext}\`\`\``)
            .addField("Latitude", `\`${location.lat}\``, true)
            .addField("Longitude", `\`${location.long}\``, true)
            .addField("Feels Like", `\`${current.feelslike}° Degress\``, true)
            .addField("Degree Type", `\`${location.degreetype}\``, true)
            .addField("Temprature", `\`${result[0].current.temperature}°C\``, true)
            .addField("Observation Time", `\`${current.observationtime}\``, true)
            .addField("Timezone", `\`GMT ${location.timezone}\``,true)
            .addField("Winds", `\`${current.winddisplay}\``, true)
            .addField("Humidity", `\`${result[0].current.humidity}%\``, true)
            .setTimestamp()
            return message.channel.send({ embeds: [embed2] })
        })
    }
}