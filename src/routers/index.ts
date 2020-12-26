import { TextChannel, Message } from 'discord.js';
import Constants from '../constants';
import { TimeLineBot, CommandBot } from '../models/bots';
import { TimeLineWebhookClient } from '../models/webhookClient';

const DiscordConstants = Constants.Discord;
const timeLineWebhookClient = new TimeLineWebhookClient();

export namespace Router {
  export function MessageRouter(msg: Message) {
    const channel = msg.channel as TextChannel;

    // コマンド実行
    if (msg.content.startsWith('/')) {
      CommandBot.delegate(msg, (replyContent) => {
        msg.reply(replyContent);
      });
    }

    // TODO: times_*に対する処理
    if (channel.name.match(DiscordConstants.TIMES_NAME_PATTERN)) {
      const { text, options } = TimeLineBot.buildTimePost(msg);
      timeLineWebhookClient.postToTimeLine(text, options);
    }
  }
}
