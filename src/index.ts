import Discord from 'discord.js';
import Debug from 'debug';
import { Constants } from './constants';
import { Router } from './routers';

const debug = Debug('warriors');
debug('warriors debug mode on.');

const DiscordConstants = Constants.Discord;
const client = new Discord.Client();

client.on('ready', () => {
  debug('ready.');
});

client.on('message', Router.MessageRouter);

client.login(DiscordConstants.BOT_TOKEN);
