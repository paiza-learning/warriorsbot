import { TextChannel, Message } from 'discord.js';
import Constants from '../constants';
import { Bots } from '../models/bots';
import { TimeLineWebhookClient } from '../models/WebhookClient';

const DiscordConstants = Constants.Discord;
const timeLineWebhookClient = new TimeLineWebhookClient();

export namespace Router {
  export function MessageRouter(msg: Message) {
    const channel = msg.channel as TextChannel;

    // Test command
    if (msg.content === '/ping') {
      msg.reply('pong!');
    }

    // TODO: times_*に対する処理
    if (channel.name.match(DiscordConstants.TIMES_NAME_PATTERN)) {
      const { text, options } = Bots.TimeLineBot.buildTimePost(msg);
      timeLineWebhookClient.postToTimeLine(text, options);
    }
  }
}
