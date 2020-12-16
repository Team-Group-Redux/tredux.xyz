import { Command, CommandContext, Permission } from './command';


export default class DashboardCommand implements Command {
    name = 'dashboard';
    summary = `Obtenha um link para o painel do servidor`;
    precondition: Permission = 'MANAGE_GUILD';
    cooldown = 3;
    module = 'General';
    
    execute = async(ctx: CommandContext) => {
        return ctx.channel.send(`${ process.env.DASHBOARD_URL}/servers/${ctx.guild.id}`);
    }
}
