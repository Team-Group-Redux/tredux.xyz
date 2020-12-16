import { Command, CommandContext, Permission } from './command';


export default class HelpCommand implements Command {
  name = 'help';
  summary = 'Veja a lista de comandos.';
  precondition: Permission = '';
  cooldown = 3;
  module = 'General';
  
  execute = async(ctx: CommandContext) => {
    await ctx.channel.send(`${ process.env.DASHBOARD_URL}/commands`);
  }
}
