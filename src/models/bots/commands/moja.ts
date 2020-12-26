import fetch from 'node-fetch';
import yaml from 'js-yaml';
import debug from 'debug';
import { CommandBot } from '../commandBot';

const mojamojaURL = 'https://www.mojamoja.cloud/api/v1/environment/latest';

CommandBot.register('/moja', async () => {
  return fetch(mojamojaURL, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      debug(data);
      return '```yaml\n' + yaml.dump(data) + '```';
    });
});
