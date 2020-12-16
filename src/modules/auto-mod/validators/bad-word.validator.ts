import { GuildDocument, MessageFilter } from '../../../data/models/guild';
import { ContentValidator } from './content-validator';
import { ValidationError } from '../auto-mod';

export default class BadWordValidator implements ContentValidator {
    filter = MessageFilter.Words;

    validate(content: string, guild: GuildDocument) {
        const msgWords = content.split(' ');
        for (const word of msgWords) {
            const isExplicit = guild.autoMod.banWords
                .some(w => w.toLowerCase() === word.toLowerCase());
            if (isExplicit) {
                throw new ValidationError('A mensagem contém palavras proibidas.', this.filter);
            }
        }
    }
}