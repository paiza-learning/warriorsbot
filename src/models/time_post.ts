import { WebhookMessageOptions, Message, TextChannel } from 'discord.js';

export interface TimePostAuthor {
  id: string;
  username: string;
  iconURL?: string;
}

export default class TimePost {
  author: TimePostAuthor;
  channel: string;
  text: string;

  constructor(msg: Message) {
    this.author = {
      id: msg.author.id,
      username: msg.author.username, // TODO: nicknameへの対応
      iconURL: msg.author.displayAvatarURL(),
    };

    this.channel = (msg.channel as TextChannel).name;
    this.text = msg.content;
  }

  webhookMessageOptions(): WebhookMessageOptions {
    const webhookMessageOptions = {
      username: `${this.author.username} #${this.channel}`,
      avatarURL: this.author.iconURL,
    } as WebhookMessageOptions;

    return webhookMessageOptions;
  }
}
