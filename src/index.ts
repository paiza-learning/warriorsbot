import Discord from 'discord.js';

const { DISCORD_TOKEN } = process.env;
const client = new Discord.Client();

function greeting(target: string): void {
  console.log(`Hello ${target}!`);
}

client.on('ready', () => {
  greeting('World');
});

client.on('message', (msg) => {
  if (msg.content === '/ping') {
    msg.reply('pong!');
  }
});

client.login(DISCORD_TOKEN);
