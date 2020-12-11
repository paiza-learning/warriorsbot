import { config } from 'dotenv';

config();

// TODO: 肥大化したら分割する

/**
 * 定数を一括管理するnamespace
 */
export namespace Constants {
  /**
   * Discordに関する定数を一括管理するnamespace
   */
  export namespace Discord {
    /**
     * Discord botのtoken
     */
    export const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || '';

    /**
     * TIMELINE投稿先のDISCORDチャンネルID
     * (webhook URLの/区切り後ろから2番目)
     */
    export const TIMELINE_ID = process.env.DISCORD_TIMELINE_ID || '';

    /**
     * TIMELINE投稿先のDISCORDチャンネルトークン
     * (webhook URLの/区切り後ろから1番目)
     */
    export const TIMELINE_TOKEN = process.env.DISCORD_TIMELINE_TOKEN || '';

    export const TIMES_NAME_PATTERN = new RegExp(/times_.+?/);
  }
}

export default Constants;
