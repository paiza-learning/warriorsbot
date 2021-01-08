import fetch from 'node-fetch';
import yaml from 'js-yaml';
import debug from 'debug';
import { Command } from '../command';

const mojamojaURL = 'https://www.mojamoja.cloud/api/v1/environment/latest';

Command.register('/moja', async () => {
  return fetch(mojamojaURL, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      debug(data);
      return '```yaml\n' + yaml.dump(data) + '```';
    });
});
