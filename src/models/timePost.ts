import {
  WebhookMessageOptions,
  Message,
  TextChannel,
  FileOptions,
} from 'discord.js';

export interface TimePostAuthor {
  id: string;
  username: string;
  iconURL?: string;
}

export default class TimePost {
  author: TimePostAuthor;
  text: string;
  files: FileOptions[];

  constructor(msg: Message) {
    this.author = {
      id: msg.author.id,
      username: msg.member?.nickname || msg.author.username,
      iconURL: msg.member?.displayAvatarURL() || msg.author.displayAvatarURL(),
    };

    // Attachments -> FileOptions の変換
    this.files = msg.attachments.map(({ url, name }) => {
      return { attachment: url, name } as FileOptions;
    });

    const channel = msg.channel as TextChannel;
    const linkIconText = channel.topic?.split('\n', 1)[0] || channel.name;
    this.text = `[${linkIconText}](<${msg.url}>) ${msg.content}`;
  }

  webhookOptions(): WebhookMessageOptions {
    const ops = {
      username: `${this.author.username} (集約)`,
      avatarURL: this.author.iconURL,
      files: this.files,
    };

    return ops;
  }
}
