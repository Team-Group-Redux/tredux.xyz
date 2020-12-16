import Log from '../../utils/log';
import EventHandler from './event-handler';
import Deps from '../../utils/deps';
import { bot } from '../../bot';
import CommandService from '../command.service';

import AutoMod from '../../modules/auto-mod/auto-mod';

export default class ReadyHandler implements EventHandler {
  started = false;
  on = 'ready';
  
  constructor(
    private autoMod = Deps.get<AutoMod>(AutoMod),
    private commandService = Deps.get<CommandService>(CommandService)) {}

  async invoke() {
    Log.info(`Bot online!`, `events`);

    if (this.started) return;
    this.started = true;
    
    await this.autoMod.init();
    await this.commandService.init();

    bot.user?.setActivity('tredux.xyz');
  }
}
