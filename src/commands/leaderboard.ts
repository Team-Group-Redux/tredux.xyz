import { Command, CommandContext, Permission } from './command';


export default class LeaderboardCommand implements Command {
    aliases = ['lb'];
    name = 'leaderboard';
    summary = `Obtenha um link para a tabela de classificação do servidor`;
    precondition: Permission = '';
    cooldown = 3;
    module = 'Leveling';
    
    execute = async(ctx: CommandContext) => {
        ctx.channel.send(`${ process.env.DASHBOARD_URL}/leaderboard/${ctx.guild.id}`);
    }
}
