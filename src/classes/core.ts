import { autoRetry } from "@grammyjs/auto-retry";
import { hydrate } from "@grammyjs/hydrate";
import { parseMode } from "@grammyjs/parse-mode";
import { run } from "@grammyjs/runner";
import { Bot } from "grammy";
import moment from "moment-timezone";
import { CustomContext } from "../typings/bot";
import { schedule_days_menu } from "../typings/menu";
import { CommandHandler, SystemHandler } from "./handler";

export class SchedulerBot<C extends CustomContext> extends Bot<C> {
    public contextHandler: CommandHandler<C>;
    public sysHandlers: SystemHandler<C>;
    constructor(token: string) {
        super(token || String(process.env.BOT_TOKEN));
        this.sysHandlers = new SystemHandler<C>(this);
        this.contextHandler = new CommandHandler<C>(this.sysHandlers);
    }

    public prepare() {
        moment.tz.setDefault("Europe/Kyiv");
        this.api.config.use(parseMode("HTML"));
        this.use(hydrate());
        this.use(schedule_days_menu);
        this.api.config.use(autoRetry());
    }

    public async start() {
        run(this);
    }
}
