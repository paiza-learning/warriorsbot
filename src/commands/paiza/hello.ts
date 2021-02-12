import {
  Command,
  CommandInfo,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';

export default class HelloCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'hello',
      group: 'paiza',
      memberName: 'hello',
      description: 'hello',
    } as CommandInfo);
  }

  run(msg: CommandoMessage): Promise<CommandoMessage> {
    return msg.say('hello');
  }
}
