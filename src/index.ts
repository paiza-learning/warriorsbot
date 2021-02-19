import { Client } from 'discord.js-commando';
import Debug from 'debug';
import path from 'path';
import { createConnection } from 'typeorm';

import { Constants } from './constants';
import { Router } from './routers';

const debug = Debug('warriors');
debug('warriors debug mode on.');

createConnection();

const DiscordConstants = Constants.Discord;

const client = new Client({
  commandPrefix: '/',
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['paiza', 'Commands created by paiza-learning team.'],
    ['utility', 'Utility commands.'],
    ['todo', 'Manage your todo list'],
  ])
  .registerCommandsIn({
    filter: /^([^.].*)\.(js|ts)$/,
    dirname: path.join(__dirname, 'commands'),
  });

client.on('ready', () => {
  debug('ready.');
});

client.on('message', Router.MessageRouter);

client.login(DiscordConstants.BOT_TOKEN);
