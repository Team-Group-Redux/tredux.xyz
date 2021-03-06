import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';

export default class SkipCommand implements Command {
  name = 'skip';
  summary = 'Pular a faixa de reprodução atual';
  precondition: Permission = 'SPEAK';
  cooldown = 5;
  module = 'Music';

  constructor(private music = Deps.get<Music>(Music)) {}
  
  execute = async(ctx: CommandContext) => {
    const player = this.music.joinAndGetPlayer(ctx.member.voice.channel, ctx.channel);
    player.skip();

    await ctx.channel.send(`> Musica pulada.`);
  }
}
