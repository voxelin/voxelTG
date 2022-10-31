import { Bot, CommandMiddleware, Composer, Context, session } from "grammy";
import { hydrate } from "@grammyjs/hydrate";
import { schedule } from "../data/schedule";
import { CustomContext } from '../typings/bot';
import { parseMode } from "@grammyjs/parse-mode";
import { schedule_days_menu, show_schedule } from "../typings/menu";
import { autoRetry } from "@grammyjs/auto-retry";
import { run, sequentialize } from "@grammyjs/runner";
import { Logtail } from "@logtail/node";
import moment from "moment-timezone";

export class SchedulerBot<C extends CustomContext> extends Bot<C> {
    public logger = new Logtail(String(process.env.LOGTAIL_TOKEN));

    constructor(token: string) {
        super(token || String(process.env.BOT_TOKEN));
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
        this.use(sequentialize(this.getSessionKey))
        this.use(session({ getSessionKey, initial: () => ({ last: 0 }) }));
        this.api.config.use(autoRetry());
    }
    public async start() {
        run(this);
        this.logger?.info("Bot up and running! 🚀");
    }

    public async sendlink() {
        let day = moment().format("dddd");
        let time = moment().format("HH:mm");
        let link: string | string[] | boolean = false;
        let sent = false;
        let name: string | boolean = false;
        if (day != "Saturday" && day != "Sunday") {
            for (let i = 0; i < schedule[day].length; i++) {
                if (time >= schedule[day][i].start && time <= schedule[day][i].end) {
                    link = schedule[day][i].link;
                    name = schedule[day][i].name;
                    sent = schedule[day][i].sent || false;
                    schedule[day][i].sent = true;
                    break;
                }
            }
        }
        return [link, name, sent];
    }

    public async setTimer(gid: string | number) {
        let data = await this.sendlink();
        let link = data[0];
        let name = data[1];
        let sent = data[2];
        if (link && !Array.isArray(link) && name && !sent) {
            await this.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${link}`, { disable_web_page_preview: true, parse_mode: "HTML" });
            await this.logger?.info(`Sent link to | ${gid} |`);
        } else if (link && Array.isArray(link) && name && !sent) {
            const week = moment().isoWeek() % 2;
            switch (name) {
                case "📚 Англійська":
                    await this.api.sendMessage(gid,
                        `<b>Починається урок</b> <code>${name}</code> \n1. [Чепурна](${link[0]})\n2. [Дунько](${link[1]})`,
                        { disable_web_page_preview: true, parse_mode: "HTML" });
                    await this.logger?.info(`Sent link to | ${gid} |`);
                    break;
                case "💻 Інформатика":
                    await this.api.sendMessage(gid,
                        `<b>Починається урок</b> <code>${name}</code> \n1. [Беднар](${link[0]})\n2. [Шеремет](${link[1]})`,
                        { disable_web_page_preview: true, parse_mode: "HTML" });
                    await this.logger?.info(`Sent link to | ${gid} |`);
                    break;
                case "🎨 Мистецтво | 📜 Основи здоров'я":
                    if (week == 1) {
                        await this.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${link[1]}`, { disable_web_page_preview: true, parse_mode: "HTML" });
                        await this.logger?.info(`Sent link to | ${gid} |`);
                    } else {
                        await this.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${link[0]}`, { disable_web_page_preview: true, parse_mode: "HTML" });
                        await this.logger?.info(`Sent link to | ${gid} |`);
                    }
                    break;
                case "🌍 Географія | 📜 Історія України":
                    if (week == 1) {
                        await this.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${link[1]}`, { disable_web_page_preview: true, parse_mode: "HTML" });
                        await this.logger?.info(`Sent link to | ${gid} |`);
                    } else {
                        await this.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${link[0]}`, { disable_web_page_preview: true, parse_mode: "HTML" });
                        await this.logger?.info(`Sent link to | ${gid} |`);
                    }
                    break;
            }
        }
    }
}

export class CommandHandler<Context extends CustomContext = CustomContext> {
    constructor(private bot: SchedulerBot<Context>) { }

    public async schedule(ctx: Context) {
        await ctx.reply(show_schedule(moment().format("dddd")), { parse_mode: "Markdown", reply_markup: schedule_days_menu, disable_web_page_preview: true });
    }
    public async start(ctx: Context) {
        await ctx.reply("Працюю на благо учнів ліцею 🤖\n\nАвтор: @ieljit", { parse_mode: "Markdown" });
    }
    public async help(ctx: Context) {
        await ctx.reply("Якщо у вас виникли проблеми з роботою бота, напишіть @ieljit");
    }
    public async about(ctx: Context) {
        await ctx.reply("Цей бот був створений для зручного доступу до розкладу занять та посилань на заняття.\n\n" + "Розробник: @ieljit");
    }
    public async link(ctx: Context) {
        let data = await this.bot.sendlink();
        let link = data[0];
        let name = data[1];
        if (link != "") {
            await ctx.reply(`<b>${name}</b> \n${link}`);
        } else {
            await ctx.reply("Посилання на урок немає у моїй базі даних. 🤔");
        }
    }
    public async handle(command: string | Context, ctx?: Context) {
        try {
            await this[command as keyof CommandHandler](<Context>ctx);
        } catch (e) {
            if (e instanceof TypeError) {
                return;
            } else {
                this.bot.logger.error(String(e));
            }
        }
    }
}