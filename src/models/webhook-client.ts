import { WebhookClient, WebhookMessageOptions } from 'discord.js';
import Debug from 'debug';
import Constants from '../constants';

const debug = Debug('warriors');
const DiscordConstants = Constants.Discord;

export class TimeLineWebhookClient {
  client: WebhookClient;

  constructor() {
    this.client = new WebhookClient(
      DiscordConstants.TIMELINE_ID,
      DiscordConstants.TIMELINE_TOKEN,
    );
  }

  postToTimeLine(text: string, options: WebhookMessageOptions) {
    this.client
      .send(text, options)
      .then((msg) => {
        debug(msg);
      })
      .catch((err) => debug(err));
  }
}
