const fs = require('fs');
const {
  webhookID,
  webhookToken,
  prefix,
  token
} = require('./config.json');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", async () => {
  const webhookClient = new Discord.WebhookClient(webhookID, webhookToken);
  const { file } = await fetch('https://komikcast.com').then(response => console.log(response));

const embed = new Discord.MessageEmbed()
	.setTitle(file)
	.setColor('#0099ff');

webhookClient.send('Webhook test', {
	username: 'some-username',
	avatarURL: 'https://i.imgur.com/wSTFkRM.png',
	embeds: [embed],
});

})


client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();


  // if (!client.commands.has(command)) return;

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));



  try {
    command.execute(message, args);



  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }

});

client.login(token);
