import { Command } from "../commands/command";
import { GuildMember, TextChannel, Message } from "discord.js";
import { GuildDocument, CustomCommand } from "../data/models/guild";

export default class Validators {
    checkCommand(command: Command, guild: GuildDocument, msg: Message) {
        const config = guild.commands.configs.find(c => c.name === command.name);
        if (!config) return;

        if (!config.enabled)
            throw new TypeError('Comando não habilitado!');
    }

    checkPreconditions(command: Command, executor: GuildMember) {
        if (command.precondition && !executor.hasPermission(command.precondition))
            throw new TypeError(`**Permissão necessária**: \`${command.precondition}\``);
    }

    checkChannel(channel: TextChannel, savedGuild: GuildDocument, customCommand?: CustomCommand) {
        const isIgnored = savedGuild.general.ignoredChannels
            .some(id => id === channel.id);

        if (isIgnored && !customCommand)
            throw new TypeError('Os comandos não podem ser executados neste canal.');
        else if (isIgnored && !customCommand.anywhere)
            throw new TypeError('Este comando personalizado não pode ser executado neste canal.');
    }
}