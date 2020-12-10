import { WebhookMessageOptions, Message, TextChannel } from 'discord.js';

export interface TimePostAuthor {
  id: string;
  username: string;
  iconURL?: string;
}

export default class TimePost {
  author: TimePostAuthor;
  text: string;

  constructor(msg: Message) {
    const channel = msg.channel as TextChannel;

    this.author = {
      id: msg.author.id,
      username:
        channel.guild.member(msg.author)?.nickname || msg.author.username,
      iconURL: msg.author.displayAvatarURL(),
    };

    this.text = `${msg.content}\n> **[original post](<${msg.url}>)** <#${channel.id}>`;
  }

  webhookMessageOptions(): WebhookMessageOptions {
    const webhookMessageOptions = {
      username: `${this.author.username} (Impersonator)`,
      avatarURL: this.author.iconURL,
    } as WebhookMessageOptions;

    return webhookMessageOptions;
  }
}