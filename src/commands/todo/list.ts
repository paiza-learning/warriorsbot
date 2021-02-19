import {
  Command,
  CommandInfo,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';
import { User } from 'discord.js';
import { Todo } from '../../entities/todo';

interface TodoListCommandArgs {
  user: User;
}

export default class TodoListCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'todo:list',
      group: 'todo',
      memberName: 'list',
      description: 'そう 僕は気づいたんだ そう 僕は気づいた',
      args: [
        {
          key: 'user',
          prompt: 'whoes?',
          type: 'user',
          default: '',
        },
      ],
    } as CommandInfo);
  }

  async run(
    msg: CommandoMessage,
    args: TodoListCommandArgs,
  ): Promise<CommandoMessage> {
    let user: User;

    if (args.user) {
      user = args.user;
    } else {
      user = msg.author;
    }

    const todos = await Todo.find({ userId: user.id });
    let text: string;

    if (todos.length !== 0) {
      const todoList = [`${user.username}'s TODO LIST:`];
      todos.forEach((todo) => {
        todoList.push(`- ${todo.id}: ${todo.title}`);
      });
      text = todoList.join('\n');
    } else {
      text = ':tada: LGTM! :tada: WE ARE FREE!';
    }

    return msg.say(text);
  }
}
