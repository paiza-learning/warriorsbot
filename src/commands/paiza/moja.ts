import {
  Command,
  CommandInfo,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';

import fetch from 'node-fetch';
import yaml from 'js-yaml';
import debug from 'debug';

const mojamojaURL = 'https://www.mojamoja.cloud/api/v1/environment/latest';

export default class MojaCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'moja',
      group: 'paiza',
      memberName: 'moja',
      description: 's10akir の自室の環境情報を得ることができます.',
    } as CommandInfo);
  }

  async run(msg: CommandoMessage): Promise<CommandoMessage> {
    const result = await fetch(mojamojaURL, { method: 'GET' })
      .then((resp) => resp.json())
      .then((data) => {
        debug(data);
        return '```yaml\n' + yaml.dump(data) + '```';
      });

    return msg.say(result);
  }
}
