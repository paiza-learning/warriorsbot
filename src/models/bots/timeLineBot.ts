import { Client, Message, TextChannel } from 'discord.js';
import Debug from 'debug';
import TimePost from '../../models/timePost';

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

  static buildSlackWebhookOptions(msg: Message) {
    debug('found timeline.');
    debug(msg);

    const images = msg.attachments.map(({ url, name }) => {
      // TODO: 画像でない添付ファイルの処理（現状ではSlack側で無視されることに甘えている）
      return { title: name || undefined, image_url: url };
    });

    const channel = msg.channel as TextChannel;
    const linkIconText = channel.topic?.split('\n', 1)[0] || channel.name;
    const text = `<${msg.url}|${linkIconText}> ${msg.cleanContent}`;

    return {
      text: text,
      as_user: true,
      username: msg.member?.nickname || msg.author.username,
      icon_url:
        msg.member?.displayAvatarURL({ format: 'png' }) ||
        msg.author.displayAvatarURL({ format: 'png' }),
      attachments: images,
    };
  }
}
