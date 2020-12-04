import Discord from 'discord.js';
import { config } from 'dotenv';

config();

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
