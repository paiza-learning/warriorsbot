/* eslint-disable no-unused-vars */
import { Message } from 'discord.js';

/**
 * 実行されるコマンド
 * 引数と内容を受け取り, 文字列を返すか msg に対して操作を行う関数
 */
type CommandFunc = (
  args: string[],
  body: string,
  msg: Message,
) => Promise<string | void>;

/**
 * コマンド情報
 * 簡易的な説明文、実行されるコマンド、ヘルプ文、グループ
 */
type CommandSpec = {
  desc: string | (() => string);
  exec: CommandFunc;
  help: string | (() => string);
};

export namespace Command {
  /**
   * コマンドの名前と処理内容の Map
   * register を介して登録する
   */
  const commands = new Map<string, CommandSpec>();

  /**
   * コマンドを登録するインターフェース
   */
  export function register(cmd: string, spec: CommandSpec) {
    commands.set(cmd, spec);
  }

  /**
   * コマンドを検索
   */
  export function lookup(cmd: string): CommandSpec | undefined {
    return commands.get(cmd);
  }

  /**
   * コマンド一覧を取得
   */
  export function list(): IterableIterator<[string, CommandSpec]> {
    return commands.entries();
  }
}
