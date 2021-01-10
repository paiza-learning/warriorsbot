import { Message } from 'discord.js';
import { TimeLineBot } from '../models/bots';
import { TimeLineWebhookClient } from '../models/webhookClient';

export namespace Handler {
  // TODO: 複雑化してきたらnamespaceごとにファイル分割する

  // tutorial: https://paiza-learning.github.io/warriorsbot/#/tutorial
  export function pingHandler(msg: Message) {
    msg.reply('pong!');
  }

  /*
   * timesの投稿をフックしてtimelineに集約する
   */
  export function timeLineHandler(msg: Message) {
    const timeLineWebhookClient = new TimeLineWebhookClient();

    const { text, options } = TimeLineBot.buildTimePost(msg);
    timeLineWebhookClient.postToTimeLine(text, options);
  }
}
