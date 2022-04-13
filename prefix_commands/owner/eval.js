const { codeBlock } = require("@discordjs/builders");

module.exports = {
    ownerOnly: true,
    run: async (client, message, args) => {
        /* Join all arguments back to string */
        const content = args.join(" ")
        /* Promisify the eval */
        let output = await new Promise((resolve, reject) => resolve(eval(content)));

        /* If output is not a string */
        if (typeof output !== "string") {
            /* convert it to string */
            output = require("util").inspect(output, { depth: 0 });
        }

        /* Send the output */
        message.channel.send({
            content: codeBlock('js', output)
        });
    }
}
