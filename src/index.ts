import Constants from './constants';
const DiscordConstants = Constants.Discord;

import Discord from 'discord.js';
import Debug from 'debug';

import { Bots } from './models/bots';

const debug = Debug('warriors');
debug('warriors debug mode on.');

const client = new Discord.Client();
const timeLineBot = new Bots.TimeLineBot(client);

client.on('ready', () => {
  debug('ready.');

  timeLineBot.defineEventListener();
});

client.on('message', (msg) => {
  if (msg.content === '/ping') {
    msg.reply('pong!');
  }
});

client.login(DiscordConstants.BOT_TOKEN);
