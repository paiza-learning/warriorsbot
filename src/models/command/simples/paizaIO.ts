import fetch from 'node-fetch';
import yaml from 'js-yaml';
import debug from 'debug';
import { Command } from '../command';
import Constants from '../../../constants';

const API_KEY = Constants.paizaIO.API_KEY;

/**
 * paiza.io API を叩いて contentBody に渡されたコードを実行してもらう
 * args[0] が言語名
 * Discord 上で syntax highlight をしているものへの対応は雑
 */
Command.register('/paizaIO', async (args, contentBody) => {
  // 気合いで実装されている
  const language = args[0];
  const [, source, input] = contentBody.split(/```.*\n*/);

  return fetch(`http://api.paiza.io:80/runners/create?api_key=${API_KEY}`, {
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
      debug('paiza: runner created');
      debug(data);
      return fetch(
        `http://api.paiza.io:80/runners/get_details?api_key=${API_KEY}&id=${data.id}`,
        { method: 'GET' },
      );
    })
    .then((res) => res.json())
    .then((data) => {
      debug('paiza: runner get details');
      debug(data);

      const replyData = {
        stdout: data.stdout,
        stderr: data.stderr,
        build_stdout: data.build_stdout,
        build_stderr: data.build_stderr,
        time: data.time,
        memory: data.memory,
        build_time: data.build_time,
        build_memory: data.build_memory,
      };

      const replyContent = '```yaml\n' + yaml.dump(replyData) + '```';

      return replyContent;
    });
});
