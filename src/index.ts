import { Client } from 'discord.js-commando';
import Debug from 'debug';
import path from 'path';

import { Constants } from './constants';
import { Router } from './routers';

const debug = Debug('warriors');
debug('warriors debug mode on.');

const DiscordConstants = Constants.Discord;

const client = new Client({
  commandPrefix: '/',
});

client.registry
  .registerDefaultTypes()
  .registerGroups([['paiza', 'Commands created by paiza-learning team.']])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  debug('ready.');
});

client.on('message', Router.MessageRouter);

client.login(DiscordConstants.BOT_TOKEN);
