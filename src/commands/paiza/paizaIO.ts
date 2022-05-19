import { Command } from '../../models/command';

import fetch from 'node-fetch';
import yaml from 'js-yaml';
import debug from 'debug';
import Constants from '../../constants';

const API_KEY = Constants.paizaIO.API_KEY;

/**
 * paiza.io API を叩いて contentBody に渡されたコードを実行してもらう
 * args[0] が言語名
 * Discord 上で syntax highlight をしているものへの対応は雑
 */
async function runCode(args: string[], contentBody: string): Promise<string> {
  // 気合いで実装されている
  const language = args[0];
  const [, source, input] = contentBody.split(/```.*\n*/);

  // 実行の流れとして
  // runners/create -> 待機 -> runners/get_details
  const runnersCreateResponse = await fetch(
    `https://api.paiza.io/runners/create?api_key=${API_KEY}`,
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
  ).then((res) => {
    return res.json();
  });

  debug('paiza: runner created');
  debug(runnersCreateResponse);

  if (runnersCreateResponse.error !== undefined) {
    return runnersCreateResponse.error;
  }

  // 個別に関数として切り出すべきかもしれない
  const runnersGetDetailsResponse = await fetch(
    `https://api.paiza.io/runners/get_details?api_key=${API_KEY}&id=${runnersCreateResponse.id}`,
    { method: 'GET' },
  ).then((res) => {
    return res.json();
  });

  debug('paiza: runner get details');
  debug(runnersGetDetailsResponse);

  if (runnersGetDetailsResponse.error !== undefined) {
    return runnersGetDetailsResponse.error;
  }

  // なるべく多くの情報を得たい人向け
  if (args.includes('--detail')) {
    const replyData = {
      stdout: runnersGetDetailsResponse.stdout,
      stderr: runnersGetDetailsResponse.stderr,
      build_stdout: runnersGetDetailsResponse.build_stdout,
      build_stderr: runnersGetDetailsResponse.build_stderr,
      time: runnersGetDetailsResponse.time,
      memory: runnersGetDetailsResponse.memory,
      build_time: runnersGetDetailsResponse.build_time,
      build_memory: runnersGetDetailsResponse.build_memory,
    };

    return '```yaml\n' + yaml.dump(replyData) + '```';
  }

  return runnersGetDetailsResponse.stdout;
}

Command.register('paizaio', {
  desc: 'paiza.io の API を利用して、与えられたコードを実行します。',
  exec: async (args, contentBody, msg) => {
    msg.reply(await runCode(args, contentBody));
  },
  help: `usage: paizaio <language> [--detail]
\\\`\\\`\\\`
// your code here
\\\`\\\`\\\`
<stdin-string>`,
});
