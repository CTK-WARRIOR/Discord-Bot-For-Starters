const db = require("quick.db")

module.exports.run = (client) => {
  console.log("JOIN CTK SERVER : https://withwin.in/dbd" )
  client.user.setActivity(db.get(`status`)); 
}