import { WebhookClient, WebhookMessageOptions } from 'discord.js';
import Debug from 'debug';
import Constants from '../constants';

const debug = Debug('warriors');
const DiscordConstants = Constants.Discord;

export class TimeLineWebhookClient {
  client: WebhookClient;

  constructor() {
    this.client = new WebhookClient({
      id: DiscordConstants.TIMELINE_ID,
      token: DiscordConstants.TIMELINE_TOKEN,
    });
  }

  postToTimeLine(text: string, options: WebhookMessageOptions) {
    this.client
      .send({ content: text, ...options })
      .then(debug)
      .catch(debug);
  }
}
