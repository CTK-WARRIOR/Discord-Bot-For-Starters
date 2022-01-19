const { prefix } = require("../settings.json");
const { Schema, model } = require("mongoose");

const guildSettingSchema = new Schema({
  guildId: {
    type: String,
  },
  prefix: {
    type: String,
    default: prefix,
  },
});

module.exports = model("guild_settings", guildSettingSchema);