import { Command } from '../../models/command';

Command.register('help', {
  desc: 'ヘルプを表示します',
  exec: async (args) => {
    let ret = '';
    if (args.length > 0) {
      for (const cmd of args) {
        const spec = Command.lookup(cmd);
        if (spec) {
          ret += `${cmd} help:\n`;
          ret += '```\n';
          ret += `${typeof spec.help === 'string' ? spec.help : spec.help()}\n`;
          ret += '```\n';
        } else {
          ret += `${cmd} is not found.\n`;
        }
      }
    } else {
      for (const [cmd, spec] of Command.list()) {
        ret += `${cmd}:\n  ${spec.desc}\n`;
      }
    }
    return ret;
  },
  help: `usage /help [command]`,
});
