import { Command, CommandContext, Permission } from './command';

import { getMemberFromMention } from '../utils/command-utils';

export default class XPCommand implements Command {
    aliases = ['level', 'profile'];
    name = 'xp';
    summary = 'Exibir o cartão XP de um usuário.';
    precondition: Permission = '';
    cooldown = 3;
    module = 'Leveling';

    execute = (ctx: CommandContext, userMention: string) =>  {
        const target = (userMention) ?
            getMemberFromMention(userMention, ctx.guild) : ctx.member;
        
        if (target.user.bot)
            throw new Error(`Usuários de bot não podem ganhar XP`);

        const xpCardURL = `${ process.env.API_URL}/guilds/${ctx.guild.id}/members/${target.id}/xp-card`;             
        return ctx.channel.send(
            { files: [{ attachment: xpCardURL, name: 'xp-card.png' }]
        });
    };
}
