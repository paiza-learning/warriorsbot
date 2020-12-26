import { Command } from '../command';

Command.Custom.register('/reactme', async (msg, args) => {
  msg.react(args[0]);
});
