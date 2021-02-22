import {
  Command,
  CommandInfo,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';
import { Record } from '../../entities/record';

interface RecCommandArgs {
  title: string;
}

export default class HelloCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'rec',
      group: 'paiza',
      memberName: 'rec',
      description: '勤務報告を作成します。',
      args: [
        {
          key: 'title',
          prompt: 'task title',
          type: 'string',
        },
      ],
    } as CommandInfo);
  }

  async run(
    msg: CommandoMessage,
    args: RecCommandArgs,
  ): Promise<CommandoMessage> {
    const record = new Record();
    record.userId = msg.author.id;
    record.title = args.title;

    await record.save();

    return msg.say(`success. [${record.title}]`);
  }
}
