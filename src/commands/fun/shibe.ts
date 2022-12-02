import { Command } from '../../models/command';
import { Message, MessageAttachment } from 'discord.js';

import fetch from 'node-fetch';
import debug from 'debug';

const shibeURL = 'http://shibe.online/api/shibes?count=1]&urls=true';

async function main(_1: string[], _2: string, msg: Message) {
  const result = await fetch(shibeURL, { method: 'GET' })
    .then((res) => res.json())
    .then((data) => {
      debug(data[0]);
      return data[0];
    });
  const attachment = new MessageAttachment(result);
  msg.channel.send({ files: [attachment] });
}

Command.register('shibe', {
  desc: 'わんこの画像が見れるわん',
  exec: main,
  help: 'わんこの画像が見れるわん',
});
