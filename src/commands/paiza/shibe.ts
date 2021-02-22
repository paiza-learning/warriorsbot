import {
    Command,
    CommandInfo,
    CommandoClient,
    CommandoMessage,
  } from 'discord.js-commando';
  
  import { 
    Message,
    MessageAttachment,
  } from 'discord.js';
  
  import fetch from 'node-fetch';
  import debug from 'debug';
  
  const shibeURL = 'http://shibe.online/api/shibes?count=1]&urls=true';
  
  export default class ShibeCommand extends Command {
    constructor(client: CommandoClient) {
      super(client, {
        name: 'shibe',
        group: 'paiza',
        memberName: 'shibe',
        description: 'わんこの画像が見れるわん',
      } as CommandInfo);
    }
  
    async run(msg: CommandoMessage): Promise<Message> {
      const result = await fetch(shibeURL, { method: 'GET' })
        .then((res) => res.json())
        .then((data) => {
          debug(data[0]);
          return data[0];
        });
      const attachment = new MessageAttachment(result);
  
      return msg.channel.send(attachment);
    }
  }