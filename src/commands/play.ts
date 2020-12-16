import { Command, CommandContext, Permission } from './command';
import Deps from '../utils/deps';
import Music from '../modules/music/music';

export default class PlayCommand implements Command {
  aliases = ['p'];
  cooldown = 2;
  module = 'Music';
  name = 'play';
  precondition: Permission = 'SPEAK';
  summary = 'Entre e reproduza um resultado do YouTube.';
  usage = 'play query'

  constructor(private music = Deps.get<Music>(Music)) {}
  
  execute = async(ctx: CommandContext, ...args: string[]) => {
    const query = args?.join(' ');
    if (!query)
      throw new TypeError('Uma consulta deve ser fornecida.');

    const player = this.music.joinAndGetPlayer(ctx.member.voice.channel, ctx.channel);

    const maxQueueSize = 7;
    if (player.q.length >= maxQueueSize)
      throw new TypeError(`Tamanho máximo da fila de \`${maxQueueSize}\` atingido...`);

    const track = await player.play(query);
    if (player.isPlaying)
      return ctx.channel.send(`> **Added**: \`${track.title}\` to list.`);
  }
}
