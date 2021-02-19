import {
  Command,
  CommandInfo,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';
import { Todo } from '../../entities/todo';

interface TodoCommandArgs {
  title: string;
  description: string;
}

export default class TodoAddCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'todo:add',
      group: 'todo',
      memberName: 'add',
      description: '忘れないで あの日の思い出',
      args: [
        {
          key: 'title',
          prompt: 'todo title (only [add])',
          type: 'string',
        },
      ],
    } as CommandInfo);
  }

  async run(
    msg: CommandoMessage,
    args: TodoCommandArgs,
  ): Promise<CommandoMessage> {
    const userId = msg.author.id;

    const todo = new Todo();
    todo.userId = userId;
    todo.title = args.title;

    await todo.save();

    return msg.say(`success. [${todo.title}]`);
  }
}
