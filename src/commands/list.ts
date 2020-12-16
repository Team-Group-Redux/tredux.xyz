import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';
import { Track } from '@2pg/music';

export default class ListCommand implements Command {
  aliases = ['q'];
  name = 'list';
  summary = 'Exibe a lista de faixas atual.';
  precondition: Permission = 'SPEAK';
  cooldown = 3;
  module = 'Music';

  constructor(private music = Deps.get<Music>(Music)) {}
  
  execute = async(ctx: CommandContext) => {
    const player = this.music.joinAndGetPlayer(ctx.member.voice.channel, ctx.channel);

    let details = '>>> **__List__**:\n';
    for (let i = 0; i < player.q.length; i++) {      
      const track: Track = player.q.items[i];
      const prefix = (i === 0)
        ? `**Now Playing**:`
        : `**[${i + 1}]**`;
      details += `${prefix} \`${track.title}\` \`${this.music.getDuration(player, track)}\`\n`;
    }
    return ctx.channel.send(details || '> Nenhuma musica na lista.');
  }
}
