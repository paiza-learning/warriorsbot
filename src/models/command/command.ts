/**
 * コマンド
 * 引数と内容を受け取り, 文字列を返す関数 (ただし async)
 */
type SimpleCommand = (args: string[], contentBody: string) => Promise<string>;

export namespace Command {
  /**
   * コマンドの名前と処理内容の Map
   * register を介して登録する
   */
  const simples = new Map<string, SimpleCommand>();

  /**
   * コマンドを登録するインターフェース
   */
  export const register = (command: string, exec: SimpleCommand) => {
    simples.set(command, exec);
  };

  /**
   * コマンドを検索
   */
  export const lookup = (command: string): SimpleCommand | undefined => {
    return simples.get(command);
  };
}
