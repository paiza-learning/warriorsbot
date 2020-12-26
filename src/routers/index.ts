import { TextChannel, Message } from 'discord.js';
import Constants from '../constants';
import { Bots } from '../models/bots';
import { TimeLineWebhookClient } from '../models/WebhookClient';
import fetch from 'node-fetch';

const DiscordConstants = Constants.Discord;
const timeLineWebhookClient = new TimeLineWebhookClient();

export namespace Router {
  export function MessageRouter(msg: Message) {
    const channel = msg.channel as TextChannel;

    // Test command
    if (msg.content === '/ping') {
      msg.reply('pong!');
    }

    if (msg.content.startsWith('/')) {
      const firstline = msg.content.split('\n', 1)[0];
      const [command, ...args] = firstline.split(' ');

      if (command == '/paiza') {
        const language = args[0];
        const [, source, input] = msg.content.split('```');

        fetch('http://api.paiza.io:80/runners/create?api_key=guest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language,
            source_code: source.trim(),
            input: input.trim(),
            longpoll: true,
            longpoll_timeout: 100,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('created');
            console.log(data);
            return fetch(
              `http://api.paiza.io:80/runners/get_details?api_key=guest&id=${data.id}`,
              { method: 'GET' },
            );
          })
          .then((res) => res.json())
          .then((data) => {
            console.log('detail');
            console.log(data);

            let replyContent = '\n';

            replyContent += 'stdout:\n```' + data.stdout + '```\n';
            if (data.stderr)
              replyContent += 'stderr:\n```' + data.stderr + '```\n';
            replyContent += `time: ${data.time}s\n`;
            replyContent += `memory: ${data.memory}B\n`;

            if (data.build_stdout)
              replyContent +=
                'build_stdout:\n```' + data.build_stdout + '```\n';
            if (data.build_stderr)
              replyContent +=
                'build_stderr:\n```' + data.build_stderr + '```\n';
            if (data.build_time)
              replyContent += `build_time: ${data.build_time}s\n`;
            if (data.build_memory)
              replyContent += `build_memory: ${data.build_memory}B\n`;

            msg.reply(replyContent);
          });
      }
    }

    // TODO: times_*に対する処理
    if (channel.name.match(DiscordConstants.TIMES_NAME_PATTERN)) {
      const { text, options } = Bots.TimeLineBot.buildTimePost(msg);
      timeLineWebhookClient.postToTimeLine(text, options);
    }
  }
}
