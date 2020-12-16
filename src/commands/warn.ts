import { Command, CommandContext, Permission } from './command';
import AutoMod from '../modules/auto-mod/auto-mod';
import Deps from '../utils/deps';
import { getMemberFromMention } from '../utils/command-utils';

export default class WarnCommand implements Command {
    precondition: Permission = 'KICK_MEMBERS';
    name = 'warn';
    usage = 'warn user reason';
    summary = 'Envie um warn a um usuário e adicione um warn à sua conta.';
    cooldown = 5;
    module = 'Auto-mod';
    
    constructor(private autoMod = Deps.get<AutoMod>(AutoMod)) {}
    
    execute = async(ctx: CommandContext, targetMention: string, ...args: string[]) => {
        const reason = args?.join(' ');
        if (!reason)
            throw new TypeError('Por que enviar um warn para alguém sem motivo :thinking: ?');

        const target = (targetMention) ?
            getMemberFromMention(targetMention, ctx.guild) : ctx.member;
        
        await this.autoMod.warn(target, { instigator: ctx.user, reason });

        await ctx.channel.send(`<@!${target}> was warned for \`${reason}\``);
    };
}
