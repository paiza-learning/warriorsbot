import { Message } from 'discord.js';
import { Command } from '../command';


export class CommandBot {
  /**
   * (MessageRouter から) CommandBot に処理を移譲する
   * 登録されたコマンドを実行し, callback を実行する
   * 対応するコマンドが無い場合は何もしない
   */
  static delegate(msg: Message, callback: (replyContent: string) => void) {
    const spec = this.parse(msg.content);

    const simple = Command.lookup(spec.command);
    if (simple !== undefined) {
      simple(spec.args, spec.contentBody).then(callback);
      return;
    }

    const custom = Command.Custom.lookup(spec.command);
    if (custom !== undefined) {
      custom(msg, spec.args, spec.contentBody);
      return;
    }
  }

  /**
   * 入力をパースしコマンドの情報を返す.
   * 形式としては
   * - 1 行目に /command args (スペース区切り)
   * - それ以降 コマンドに渡される内容
   */
  static parse(content: string) {
    const firstline = content.split('\n', 1)[0];
    const [command, ...args] = firstline.split(' ');
    const contentBody = content.substr(firstline.length + 1);

    return { command, args, contentBody };
  }
}
