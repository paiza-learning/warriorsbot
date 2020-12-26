import { CommandBot } from '../commandBot';

// test command
CommandBot.register('/ping', async () => {
  return 'pong!';
});
