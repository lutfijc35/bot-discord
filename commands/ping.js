module.exports = {
	name: 'ping',
	description: 'Ping!',
  aliases: ['pong', 'pang'],
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
