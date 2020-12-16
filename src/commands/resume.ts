import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';

export default class ResumeCommand implements Command {
  name = 'resume';
  summary = 'Retome a reprodução de uma faixa se estiver em pausa.';
  precondition: Permission = 'SPEAK';
  module = 'Music';

  constructor(private music = Deps.get<Music>(Music)) {}
  
  execute = async (ctx: CommandContext) => {
    const player = this.music.joinAndGetPlayer(ctx.member.voice.channel, ctx.channel);

    if (!player.isPaused)
      throw new TypeError('O player já foi retomado.');

    await player.resume();
      
    ctx.channel.send(`> **Resumed**: \`${player.q.peek().title}\``);
  }
}
