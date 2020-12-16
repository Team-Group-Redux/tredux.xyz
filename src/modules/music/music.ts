import { TextChannel, VoiceChannel } from 'discord.js';
import { MusicClient, Player, Track } from '@2pg/music';

export default class Music {
  private _client = {} as MusicClient;
  get client() { return this._client; }

  constructor() {
    this._client = new MusicClient();   
    
    this.hookEvents();
  }

  private hookEvents() {
    this.client.on('trackStart', (player, track) => player.textChannel?.send(`> **Tocando Agora**: \`${track.title}\` 🎵`));
    this.client.on('queueEnd', (player) => player.textChannel?.send(`> **Queue has Ended** 🎵`));
  }
  
  joinAndGetPlayer(voiceChannel?: VoiceChannel, textChannel?: TextChannel) {
    if (!voiceChannel)
      throw new TypeError('Você deve estar em um canal de voz para tocar música.');
      
    return this.client.get(voiceChannel.guild.id)
      ?? this.client.create(voiceChannel.guild.id, { textChannel, voiceChannel });
  }

  getDuration(player: Player, track?: Track) {
    if (!player.isPlaying)
      throw new TypeError('Nenhuma faixa está tocando no momento.');

    const positionInSeconds = (track === player.q.peek())
      ? player.position / 1000
      : 0;
    track = (track ?? player.q.peek()) as Track;     

    return `${Math.floor(positionInSeconds / 60)}:${Math.floor(positionInSeconds % 60).toString().padStart(2, '0')} / ` +
      `${Math.floor(track.duration.seconds / 60)}:${Math.floor(track.duration.seconds % 60).toString().padStart(2, '0')}`;
  }

  async findTrack(query: string, maxTrackLength: number) {
    const track: Track = await this.searchForTrack(query);

    const maxHoursInSeconds = maxTrackLength * 60 * 60;    
    if (track.duration.seconds > maxHoursInSeconds)
      throw new TypeError(`O comprimento das musicas deve ser menor ou igual a \`${maxTrackLength} horas\`.`);
    return track;
  }

  private async searchForTrack(query: string) {
    const videos = await this.client.search(query);  
    return videos[0];
  }
}
