const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();


client.login(token);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === `${prefix}ping`) {
  	msg.channel.send('Pong.');
  } else if (msg.content === `${prefix}beep`) {
  	msg.channel.send('Boop.');
  } else if (msg.content === `${prefix}server`) {
	msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
}

});
