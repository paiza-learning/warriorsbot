import { config } from 'dotenv';
config();

import Discord, { TextChannel, WebhookClient } from 'discord.js';
import TimePost from './models/time_post';
import Debug from 'debug';

const debug = Debug('warriors');
debug('warriors debug mode on.');

const {
  DISCORD_TOKEN,
  DISCORD_TIMELINE_ID,
  DISCORD_TIMELINE_TOKEN,
} = process.env;

const client = new Discord.Client();
const webhookClient = new WebhookClient(
  DISCORD_TIMELINE_ID || '',
  DISCORD_TIMELINE_TOKEN || '',
);

client.on('ready', () => {
  debug('ready.');
});

client.on('message', (msg) => {
  const channel = msg.channel as TextChannel;

  // TODO: times_*に対する処理
  if (channel.name.match('times_.+?')) {
    debug('found timeline.');
    debug(msg);

    const timePost = new TimePost(msg);

    // timelineにpostする
    webhookClient
      .send(timePost.text, timePost.webhookMessageOptions())
      .then((msg) => debug(msg))
      .catch((err) => debug(err));
  }

  if (msg.content === '/ping') {
    msg.reply('pong!');
  }
});

client.login(DISCORD_TOKEN);
