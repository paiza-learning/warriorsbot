import { Command } from '../../models/command';
import { MessageAttachment, Message } from 'discord.js';
import { getManager } from 'typeorm';

async function run(args: string[], _: string, msg: Message) {
  const manager = getManager();
  const response: { string: string }[] = await manager.query(args.join(' '));

  const output = formatResponse(response);

  // Discord の文字数上限が 2000 文字なので 1994 文字以下ならテキストで返す
  if (output.length <= 1994) {
    msg.reply('```' + output + '```');
    return;
  }

  const attach = new MessageAttachment(
    Buffer.from(output),
    'output-' + msg.id + '.txt',
  );

  msg.reply({ content: 'length limit exceeded', files: [attach] });
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

Command.register('query', {
  desc: 'DB 上で任意の SQL を実行し, 結果を返します.',
  exec: run,
  help: 'DB 上で任意の SQL を実行し, 結果を返します.',
});
