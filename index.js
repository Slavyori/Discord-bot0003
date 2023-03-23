// import bot token from .env file

const TOKEN = require('dotenv').config();

// import discord.js module
const {Client, GatewayIntentBits, TextChannel, Message, Partials} = require('discord.js');

// import openai module, key, new config
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

// configure Discord bot permissions(intents)
const client = new Client({intents: 
    [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.GuildScheduledEvents,
    ],

    'partials': [Partials.Channel]
});

// console log bot startup
client.on('ready', () => {
    client.user.setActivity('劇本背誦');
    console.log(`I'M ALIVE!! LOGGED IN AS ${client.user.tag}`)
});


// function returns AI response every time text is sent to server
client.on('messageCreate', async function (message) {
    
    const botTag = `<@${client.user.id}>`;
    if (message.content.includes(botTag));

    if (!message.content.includes(botTag)) return;

    if (message.author.id === client.user.id) return;

    await message.channel.sendTyping();
    
    try {
        // ignore input from the bot itself


        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages:[
                {"role": "system", "content": "你是田中琴葉、......" },
                {"role": "system", "content": "北澤志保是......" },
                {"role": "system", "content": "松田亞利沙是......"},
                {"role": "user", "content": "你喜歡什麼？......"},
                {"role": "assistant", "content": "うん......"},
                {"role": "user", "content": `${message.content}`}
        ]});
        message.reply(`${completion.data.choices[0].message.content}`) 
    }   catch (error) {
            console.log(error)
            }

    
});
// use token from env file to log in

client.login(process.env.TOKEN);

