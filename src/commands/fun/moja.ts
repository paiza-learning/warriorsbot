import { Command } from '../../models/command';

import fetch from 'node-fetch';
import yaml from 'js-yaml';
import debug from 'debug';

const mojamojaURL = 'https://www.mojamoja.cloud/api/v1/environment/latest';

async function main() {
  return await fetch(mojamojaURL, { method: 'GET' })
    .then((resp) => resp.json())
    .then((data) => {
      debug(data);
      return '```yaml\n' + yaml.dump(data) + '```';
    });
}

Command.register('moja', {
  desc: '@s10akir の自室の環境情報を取得します。',
  exec: main,
  help: '@s10akir の自室の環境情報を取得します。',
});
