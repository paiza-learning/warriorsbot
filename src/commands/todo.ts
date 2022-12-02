import { Command } from '../models/command';
import { Todo } from '../entities/todo';
import { Message } from 'discord.js';

async function main(args: string[], _: string, msg: Message) {
  switch (args[0]) {
    case 'add':
      addTodo(args, msg);
      break;
    case 'del':
      delTodo(args, msg);
      break;
    case 'list':
      listTodo(msg);
      break;
  }
}

async function addTodo(args: string[], msg: Message) {
  const userId = msg.author.id;

  const todo = new Todo();
  todo.userId = userId;
  todo.title = args[0];

  await todo.save();

  return msg.reply(`success. [${todo.title}]`);
}

async function delTodo(args: string[], msg: Message) {
  const todo = await Todo.findOne(args[0]);
  const userId = msg.author.id;

  if (!todo) {
    return msg.reply('[!] todo does not exists.');
  }

  if (todo.userId !== userId) {
    return msg.reply('[!] you are not owner of this todo.');
  }

  const todo_title = todo.title;
  await todo.remove(); // DBの容量節約にレコードを物理削除

  return msg.reply(`success! remove [${todo_title}]`);
}

async function listTodo(msg: Message) {
  const user = msg.author;

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

  return msg.reply(text);
}

Command.register('todo', {
  desc: 'manage your todo',
  exec: main,
  help: `usage todo [add|del|list]
add: add todo
  todo add [title]
del: delete todo
  todo del [id]
list: list todo`,
});
