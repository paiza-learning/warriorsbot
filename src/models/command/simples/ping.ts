import { Command } from '../command';

// test command
Command.register('/ping', async () => {
  return 'pong!';
});
