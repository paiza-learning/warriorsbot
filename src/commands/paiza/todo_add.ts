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
      name: 'todo_add',
      group: 'paiza',
      memberName: 'todo_add',
      description: '忘れないで あの日の思い出',
      args: [
        {
          key: 'title',
          prompt: 'todo title (only [add])',
          type: 'string',
        },
        {
          key: 'description',
          prompt: 'todo description (only [add])',
          type: 'string',
          default: '',
        },
      ],
    } as CommandInfo);
  }

  async run(
    msg: CommandoMessage,
    args: TodoCommandArgs,
  ): Promise<CommandoMessage> {
    console.log(args); // FIXME: TODO
    const userId = msg.author.id; // FIXME: TODO
    console.log(userId);

    const todo = new Todo();
    todo.userId = userId;
    todo.title = args.title;
    todo.description = args.description;

    await todo.save();

    return msg.say(`success. [${todo.title}]`);
  }
}
