import { Client, Intents } from 'discord.js';
import Debug from 'debug';
// import { createConnection } from 'typeorm';

import { Constants } from './constants';
import { Router } from './routers';

const debug = Debug('warriors');
debug('warriors debug mode on.');

// createConnection();

const DiscordConstants = Constants.Discord;

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  debug('ready.');
});

client.on('messageCreate', Router.MessageRouter);

client.login(DiscordConstants.BOT_TOKEN);
