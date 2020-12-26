import { Client, Message } from 'discord.js';
import Debug from 'debug';
import TimePost from '../../models/TimePost';

const debug = Debug('warriors');

export class TimeLineBot {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  static buildTimePost(msg: Message) {
    debug('found timeline.');
    debug(msg);

    const timePost = new TimePost(msg);
    return {
      text: timePost.text,
      options: timePost.webhookOptions(),
    };
  }
}
