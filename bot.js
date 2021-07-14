const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
const PREFIX = "#";
const BOT_TOKEN = "your discord bot token";
const TENOR_KEY = "your tenor api key";
const RESPONSE_LIMIT = "amount of GIFs tenor returns";

client.on("ready", () => {
    console.log(`${client.user.username} is Online`);
});

client.on("message", (message) => {
    if (message.content[0] != PREFIX) return;

    // remove the prefix
    let mess = message.content.substring(1);
    // split message to words array
    mess = mess.split(" ");
    // request format: #showme dog, #showme cat
    if (mess[0] == "showme" && mess.length === 2)
        pickGif(mess[1]).then((res) => message.channel.send(res));
});

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
async function pickGif(topic) {
    let url = `https://g.tenor.com/v1/search?q=${topic}&key=${TENOR_KEY}&limit=${RESPONSE_LIMIT}`;
    let result = fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let { results } = data;
            let rand = randomIntFromInterval(1, results.length);
            //console.log(results); // results should be a json list
            return results[rand - 1].url;
        })
        .catch((error) => console.log(error));
    //console.log(result);  // result should be an url
    return result;
}

client.login(BOT_TOKEN);
