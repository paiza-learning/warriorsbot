import { Client, Message, TextChannel, WebhookClient } from 'discord.js';

import Constants from '../../constants';
import Debug from 'debug';
import TimePost from '../../models/time_post';

const debug = Debug('warriors');
const DiscordConstants = Constants.Discord;

const webhookClient = new WebhookClient(
  DiscordConstants.TIMELINE_ID,
  DiscordConstants.TIMELINE_TOKEN,
);

export class TimeLineBot {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  defineEventListener() {
    this.client.on('message', (msg) => {
      const channel = msg.channel as TextChannel;

      // TODO: times_*に対する処理
      if (channel.name.match(DiscordConstants.TIMES_NAME_PATTERN)) {
        this.postTimeline(msg);
      }
    });
  }

  postTimeline(msg: Message) {
    debug('found timeline.');
    debug(msg);

    const timePost = new TimePost(msg);

    // timelineにpostする
    webhookClient
      .send(timePost.text, timePost.webhookMessageOptions())
      .then((msg) => debug(msg))
      .catch((err) => debug(err));
  }
}
