import { Command } from '../../models/command';

Command.register('reactme', {
  desc: '投稿に指定したリアクションをしてくれます',
  exec: async (args, _, msg) => {
    msg.react(args[0]);
  },
  help: '投稿に指定したリアクションをしてくれます',
});
