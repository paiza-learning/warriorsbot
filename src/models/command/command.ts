/**
 * コマンド
 * 引数と内容を受け取り, 文字列を返す関数 (ただし async)
 */
type SimpleCommand = (args: string[], contentBody: string) => Promise<string>;

export class Command {
  /**
   * コマンドの名前と処理内容の Map
   * register を介して登録する
   */
  private static simples: Map<string, SimpleCommand> = new Map();

  /**
   * コマンドを登録するインターフェース
   */
  static register(command: string, exec: SimpleCommand) {
    this.simples.set(command, exec);
  }

  /**
   * コマンドを検索
   */
  static lookup(command: string): SimpleCommand | undefined {
    return this.simples.get(command);
  }
}
