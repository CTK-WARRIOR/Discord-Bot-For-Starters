const { readdirSync } = require("fs"),
ascii = require("ascii-table");
const mongoose = require('mongoose');
const { mongooseConnectionString } = require('../settings.json')

let table = new ascii("Events");
table.setHeading("Events", "Load status");

module.exports = (client) => {
  const commands = readdirSync("./events").filter(file => file.endsWith(".js"));
  for (let file of commands) {

    try {
        let pull = require(`../events/${file}`);
        if (pull.event && typeof pull.event !== "string") {
            table.addRow(file, `❌ -> Property event should be string.`);
            continue;
        }
        
        pull.event = pull.event || file.replace(".js", "")
        client.on(pull.event, pull.run.bind(null, client))
        table.addRow(file, '✅');

    } catch(err) {
        console.log("Error While loading/executing command, join for help : https://withwin.in/dbd")
        console.log(err)
        table.addRow(file, `❌ -> Error while loading event, join for help :  https://withwin.in/dbd`);
    }
  }

  console.log(table.toString());

  if(!mongooseConnectionString) return;

  mongoose.connect(mongooseConnectionString, {
    useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
  }).then(() => console.log('MongoDB Connection Successful.'));
}