import { Message } from 'discord.js';

/**
 * シンプルなコマンド
 * 引数と内容を受け取り, 文字列を返す関数 (ただし async)
 * 基本的にはこちらを利用する
 */
type SimpleCommand = (args: string[], contentBody: string) => Promise<string>;

/**
 * カスタムコマンド
 * コマンドを発火した Message, 引数と内容を受け取り, Promise を返す関数
 * 何らかの事情で凝ったことをしたいときに利用する
 */
type CustomCommand = (msg: Message, args: string[], contentBody: string) => Promise<void>;

export namespace Command {
  /**
   * コマンドの名前と処理内容の Map
   * register を介して登録する
   */
  const simples = new Map<string, SimpleCommand>();

  /**
   * コマンドを登録するインターフェース
   */
  export function register(command: string, exec: SimpleCommand) {
    simples.set(command, exec);
  }

  /**
   * コマンドを検索
   */
  export function lookup(command: string): SimpleCommand | undefined {
    return simples.get(command);
  }

  export namespace Custom {
    /**
     * コマンドの名前と処理内容の Map
     * register を介して登録する
     */
    const customs = new Map<string, CustomCommand>();

    /**
     * コマンドを登録するインターフェース
     */
    export function register(command: string, exec: CustomCommand) {
      customs.set(command, exec);
    }

    /**
     * コマンドを検索
     */
    export function lookup(command: string): CustomCommand | undefined {
      return customs.get(command);
    }
  }
}
