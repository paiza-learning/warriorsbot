/* eslint-disable no-unused-vars */
import { Message } from 'discord.js';
import { Command } from '../command';
import '../../commands';

export class CommandBot {
  /**
   * (MessageRouter から) CommandBot に処理を移譲する
   * 登録されたコマンドを実行し, callback を実行する
   * 対応するコマンドが無い場合は何もしない
   */
  static delegate(msg: Message, callback: (replyContent: string) => any): any {
    const { cmd, args, body } = this.parse(msg.content);
    const command = Command.lookup(cmd.substring(1));

    if (command === undefined) return;

    command.exec(args, body, msg).then((res) => {
      console.log('callback');
      if (typeof res === 'string') return callback(res);
    });
  }

  /**
   * 入力をパースしコマンドの情報を返す.
   * 形式としては
   * - 1 行目に /command args (スペース区切り)
   * - それ以降 コマンドに渡される内容
   */
  static parse(content: string) {
    const firstline = content.split('\n', 1)[0];
    const [cmd, ...args] = firstline.split(' ');
    const body = content.substring(firstline.length + 1);

    return { cmd, args, body };
  }
}
