import {
  Command,
  CommandInfo,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';

import fetch from 'node-fetch';
import yaml from 'js-yaml';
import debug from 'debug';
import Constants from '../../constants';

const API_KEY = Constants.paizaIO.API_KEY;

export default class HelloCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'paizaio',
      group: 'paiza',
      memberName: 'paizaio',
      description: 'paiza.io の API を利用して, コードを実行します.',
    } as CommandInfo);
  }

  async run(msg: CommandoMessage): Promise<CommandoMessage> {
    const content = msg.content;
    const firstline = content.split('\n', 1)[0];
    const [, ...args] = firstline.split(' ');
    const contentBody = content.substr(firstline.length + 1);

    return paizaIO(args, contentBody).then((result: string) => {
      return msg.say(result);
    });
  }
}

/**
 * paiza.io API を叩いて contentBody に渡されたコードを実行してもらう
 * args[0] が言語名
 * Discord 上で syntax highlight をしているものへの対応は雑
 */
async function paizaIO(args: string[], contentBody: string): Promise<string> {
  // 気合いで実装されている
  const language = args[0];
  const [, source, input] = contentBody.split(/```.*\n*/);

  const res1 = await fetch(
    `http://api.paiza.io:80/runners/create?api_key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        source_code: source.trim(),
        input: input.trim(),
        longpoll: true,
        longpoll_timeout: 100,
      }),
    },
  );

  const data1 = await res1.json();
  debug('paiza: runner created');
  debug(data1);

  if (data1.error !== undefined) {
    return data1.error;
  }

  const res2 = await fetch(
    `http://api.paiza.io:80/runners/get_details?api_key=${API_KEY}&id=${data1.id}`,
    { method: 'GET' },
  );

  const data2 = await res2.json();

  debug('paiza: runner get details');
  debug(data2);

  if (data2.error !== undefined) {
    return data1.error;
  }

  if (args.includes('--detail')) {
    const replyData = {
      stdout: data2.stdout,
      stderr: data2.stderr,
      build_stdout: data2.build_stdout,
      build_stderr: data2.build_stderr,
      time: data2.time,
      memory: data2.memory,
      build_time: data2.build_time,
      build_memory: data2.build_memory,
    };

    return '```yaml\n' + yaml.dump(replyData) + '```';
  }

  return data2.stdout;
}
