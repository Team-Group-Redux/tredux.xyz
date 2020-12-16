import { Command, CommandContext, Permission } from './command';

export default class SayCommand implements Command {
    name = 'say';
    summary = `Faça o bot dizer algo`;
    precondition: Permission = 'MENTION_EVERYONE';
    cooldown = 3;
    module = 'General';
    
    execute = async(ctx: CommandContext, ...args: string[]) => {
        return ctx.channel.send(args.join(' '));
    }
}
