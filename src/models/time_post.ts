import { WebhookMessageOptions, Message, TextChannel, MessageAttachment, Collection, FileOptions } from 'discord.js';

export interface TimePostAuthor {
  id: string;
  username: string;
  iconURL?: string;
}

export default class TimePost {
  author: TimePostAuthor;
  text: string;
  files: FileOptions[] = [];

  constructor(msg: Message) {
    const channel = msg.channel as TextChannel;

    this.author = {
      id: msg.author.id,
      username:
        channel.guild.member(msg.author)?.nickname || msg.author.username,
      iconURL: msg.author.displayAvatarURL(),
    };

    if (msg.attachments) {
        this.files = this.attachementToFiles(msg.attachments);
    }

    const linkIconText = channel.topic?.split('\n')[0] || channel.name;
    this.text = `[${linkIconText}](<${msg.url}>) ${msg.content}`;
  }

  webhookMessageOptions(): WebhookMessageOptions {
    const webhookMessageOptions = {
      username: `${this.author.username} (Impersonator)`,
      avatarURL: this.author.iconURL,
      files: this.files,
    } as WebhookMessageOptions;

    return webhookMessageOptions;
  }

  private attachementToFiles(attachements: Collection<string, MessageAttachment>): FileOptions[] {
    const files: FileOptions[] = []
    attachements.forEach(messageAttachement => {
      files.push({attachment: messageAttachement.url, name: messageAttachement.name} as FileOptions)
    })    
    return files;
  }
}
