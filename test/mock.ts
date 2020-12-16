import { User, GuildMember, Guild } from 'discord.js';
import { mock } from 'ts-mockito';
import { CommandContext } from '../src/commands/command';

export class Mock {
  static guild() {
    const guild = mock<Guild>();

    guild.id = '772276267935989770';
    guild.name = 'TGR Redux';

    return guild;
  }

  static member() {
    const member = mock<GuildMember>();
    
    member.guild = Mock.guild();
    member.user = Mock.user();

    return member;
  }

  static user() {
    const user = mock<User>();

    user.username = 'User';
    user.discriminator = '9564';
    user.id = '583676051838861342';

    return user;
  }
}