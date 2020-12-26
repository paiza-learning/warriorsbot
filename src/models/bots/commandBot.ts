import { Message } from 'discord.js';

/**
 * コマンド
 * 引数と内容を受け取り, 文字列を返す関数 (ただし async)
 */
type Command = (args: string[], contentBody: string) => Promise<string>;

export class CommandBot {
  /**
   * コマンドの名前と処理内容の Map
   * register を介して登録する
   */
  private static commands: Map<string, Command> = new Map();

  /**
   * コマンドを登録するインターフェース
   */
  static register(command: string, exec: Command) {
    this.commands.set(command, exec);
  }

  /**
   * (MessageRouter から) CommandBot に処理を移譲する
   * 登録されたコマンドを実行し, callback を実行する
   * 対応するコマンドが無い場合は何もしない
   */
  static delegate(msg: Message, callback: (replyContent: string) => void) {
    const spec = this.parse(msg.content);
    const exec = CommandBot.commands.get(spec.command);

    if (exec !== undefined) {
      exec(spec.args, spec.contentBody).then(callback);
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
