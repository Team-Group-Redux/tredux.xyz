import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';

export default class StopCommand implements Command {
  aliases = ['leave'];
  name = 'stop';
  summary = 'Pare a reprodução, limpe a lista e saia do canal';
  precondition: Permission = 'SPEAK';
  cooldown = 5;
  module = 'Music';

  constructor(private music = Deps.get<Music>(Music)) {}
  
  async execute(ctx: CommandContext) {

    const player = this.music.client.players.get(ctx.guild.id)
    if (!player)
      throw new TypeError('Atualmente não reproduz nenhuma faixa.');
    
    player.stop();    
    player.leave();
    
    await ctx.channel.send(`> Reprodução interrompida, e saindo do canal..`);
  }
}
