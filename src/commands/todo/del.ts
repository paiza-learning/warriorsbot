import {
  Command,
  CommandInfo,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';
import { Todo } from '../../entities/todo';

interface TodoDelCommandArgs {
  id: number;
}

export default class TodoDelCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'todo:del',
      group: 'todo',
      memberName: 'del',
      description: '今日の日は さようなら また会う日まで',
      args: [
        {
          key: 'id',
          prompt: 'todo id',
          type: 'integer',
        },
      ],
    } as CommandInfo);
  }

  async run(
    msg: CommandoMessage,
    args: TodoDelCommandArgs,
  ): Promise<CommandoMessage> {
    const todo = await Todo.findOne({ id: args.id });
    const userId = msg.author.id;

    if (!todo) {
      return msg.say('[!] todo does not exists.');
    }

    if (todo.userId !== userId) {
      return msg.say('[!] you are not owner of this todo.');
    }

    const todo_title = todo.title;
    await todo.remove(); // DBの容量節約にレコードを物理削除

    return msg.say(`success! remove [${todo_title}]`);
  }
}
