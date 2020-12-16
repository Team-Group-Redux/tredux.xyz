import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';

export default class SeekCommand implements Command {
  precondition: Permission = 'SPEAK';
  name = 'seek';
  usage = 'seek [position]';
  summary = 'Veja a posição atual da lista ou vá para uma posição na lista.';
  cooldown = 1;
  module = 'Music';

  constructor(private music = Deps.get<Music>(Music)) {}
  
  execute = async(ctx: CommandContext, position: string) => {
    const player = this.music.joinAndGetPlayer(ctx.member.voice.channel, ctx.channel);
    if (player.q.length <= 0)
      throw new TypeError('Nenhuma faixa atualmente tocando');

    const pos = +position;    
    if (!pos)
      return ctx.channel.send(`> Track at: \`${this.music.getDuration(player)}\``);

    await player.seek(pos);

    return ctx.channel.send(`> Player at \`${pos}s\`.`);
  }
}
