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
    const channelObj = msg.channel as TextChannel;

    this.author = {
      id: msg.author.id,
      username:
        channelObj.guild.member(msg.author)?.nickname || msg.author.username,
      iconURL: msg.author.displayAvatarURL(),
    };

    this.channel = channelObj.name;
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
