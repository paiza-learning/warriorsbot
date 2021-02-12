import {
  Command,
  CommandInfo,
  CommandoClient,
  CommandoMessage,
} from 'discord.js-commando';

interface ReactMeArgument {
  emoji: string;
}

export default class HelloCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'reactme',
      group: 'paiza',
      memberName: 'reactme',
      description: '投稿に指定したリアクションをしてくれます.',
      args: [
        {
          key: 'emoji',
          prompt: 'What would you like me to react with?',
          type: 'string',
        },
      ],
    } as CommandInfo);
  }

  async run(msg: CommandoMessage, args: ReactMeArgument): Promise<null> {
    msg.react(args.emoji);
    return null;
  }
}
