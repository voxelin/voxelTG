import { autoRetry } from "@grammyjs/auto-retry";
import { hydrate } from "@grammyjs/hydrate";
import { parseMode } from "@grammyjs/parse-mode";
import { run, sequentialize } from "@grammyjs/runner";
import { Logtail } from "@logtail/node";
import { Bot, Context, session } from "grammy";
import moment from "moment-timezone";
import { CustomContext } from "../typings/bot";
import { schedule_days_menu } from "../typings/menu";
import { CommandHandler } from "./handler";

export class SchedulerBot<C extends CustomContext> extends Bot<C> {
    public logger = new Logtail(String(process.env.LOGTAIL_TOKEN));
    public contextHandler: CommandHandler<C>;
    constructor(token: string) {
        super(token || String(process.env.BOT_TOKEN));
        this.contextHandler = new CommandHandler<C>(this);
    }

    public getSessionKey(ctx: Context) {
        return ctx.chat?.id.toString();
    }

    public prepare() {
        moment.tz.setDefault("Europe/Kyiv");
        const getSessionKey = this.getSessionKey;
        this.api.config.use(parseMode("HTML"));
        this.use(hydrate());
        this.use(schedule_days_menu);
        this.use(sequentialize(this.getSessionKey));
        this.use(session({ getSessionKey, initial: () => ({ last: 0 }) }));
        this.api.config.use(autoRetry());
    }

    public async start() {
        run(this);
        this.logger?.info("Bot up and running! 🚀");
    }
}
