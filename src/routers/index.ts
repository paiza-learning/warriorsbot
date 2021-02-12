import { TextChannel, Message } from 'discord.js';
import Constants from '../constants';
import { Handler } from '../handler';

const DiscordConstants = Constants.Discord;

export namespace Router {
  export function MessageRouter(msg: Message) {
    const channel = msg.channel as TextChannel;

    // tutorial: https://paiza-learning.github.io/warriorsbot/#/tutorial
    if (msg.content.startsWith('/ping')) {
      Handler.pingHandler(msg);
    }

    if (channel.name.match(DiscordConstants.TIMES_NAME_PATTERN)) {
      Handler.timeLineHandler(msg);
    }
  }
}
