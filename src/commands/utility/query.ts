import {
  Command,
  CommandInfo,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';

import { MessageAttachment } from 'discord.js';

import { getManager } from 'typeorm';

interface QueryCommandArgs {
  sql: string;
}

export default class QueryCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'query',
      group: 'utility',
      memberName: 'query',
      description: 'DB 上で任意の SQL を実行し, 結果を返します.',
      args: [
        {
          key: 'sql',
          prompt: 'sql',
          type: 'string',
        },
      ],
    } as CommandInfo);
  }

  async run(
    msg: CommandoMessage,
    args: QueryCommandArgs,
  ): Promise<CommandoMessage> {
    const manager = getManager();
    const response: { string: string }[] = await manager.query(args.sql);

    const output = formatResponse(response);

    // Discord の文字数上限が 2000 文字なので 1994 文字以下ならテキストで返す
    if (output.length <= 1994) {
      return msg.say('```' + output + '```');
    }

    const attach = new MessageAttachment(
      Buffer.from(output),
      'output-' + msg.id + '.txt',
    );

    return msg.say('length limit exceeded', attach);
  }
}

function formatResponse(response: { string: string }[]): string {
  const responseByColumn: { [column: string]: string[] } = {};

  for (const r of response) {
    for (const [k, v] of Object.entries(r)) {
      responseByColumn[k] = responseByColumn[k] || [];
      responseByColumn[k].push(v);
    }
  }

  const maxlen: { [column: string]: number } = {};
  for (const [i, r] of Object.entries(responseByColumn)) {
    maxlen[i] = i.length;
    for (const v of r) {
      maxlen[i] = Math.max(maxlen[i], String(v).length);
    }
  }

  let output = '';

  const headers = [];
  const separators = [];

  for (const [k, v] of Object.entries(maxlen)) {
    headers.push(k + ' '.repeat(v - k.length));
    separators.push('-'.repeat(v));
  }

  output += headers.join(' | ') + '\n';
  output += separators.join('-+-') + '\n';

  for (const r of response) {
    const row = [];
    for (const [k, v] of Object.entries(r)) {
      const sv = String(v);
      row.push(sv + ' '.repeat(maxlen[k] - sv.length));
    }
    output += row.join(' | ') + '\n';
  }

  return output;
}
