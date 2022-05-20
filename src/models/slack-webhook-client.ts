import fetch from 'node-fetch';
import Constants from '../constants';

const SlackConstants = Constants.Slack;

export interface SlackWebhookOptions {
  text: string;
  as_user: boolean;
  username: string;
  icon_url?: string;
  attachments?: {
    title?: string;
    image_url?: string;
  }[];
}

export class SlackWebhookClient {
  static post(slackWebhookOptions: SlackWebhookOptions) {
    fetch(SlackConstants.TIMELINE_URL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackWebhookOptions),
    }).catch((err) => {
      console.log(err);
    });
  }
}
