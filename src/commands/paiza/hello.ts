import { Command } from '../../models/command';

Command.register('hello', {
  desc: 'hello',
  exec: async () => 'hello',
  help: 'hello',
});
