import { autoRetry } from "@grammyjs/auto-retry";
import { hydrate } from "@grammyjs/hydrate";
import { parseMode } from "@grammyjs/parse-mode";
import { run, sequentialize } from "@grammyjs/runner";
import { Logtail } from "@logtail/node";
import { Bot, Context, session } from "grammy";
import moment from "moment-timezone";
import { schedule } from "../data/schedule";
import { CustomContext } from "../typings/bot";
import { schedule_days_menu } from "../typings/menu";

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
        this.use(sequentialize(this.getSessionKey));
        this.use(session({ getSessionKey, initial: () => ({ last: 0 }) }));
        this.api.config.use(autoRetry());
    }

    public async start() {
        run(this);
        this.logger?.info("Bot up and running! 🚀");
    }

    public async automaticLink() {
        const day = moment().format("dddd");
        const time = moment().format("HH:mm");
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

    public async requestLink(ctx: C): Promise<(string | boolean | string[])[] | undefined> {
        const day = moment().format("dddd");
        const time = moment().format("HH:mm");
        let link: string | string[] | boolean = false;
        let sent = false;
        let name: string | boolean = false;
        let is_next = false;
        if (day != "Saturday" && day != "Sunday") {
            for (let i = 0; i < schedule[day].length; i++) {
                if (time >= schedule[day][schedule[day].length - 1].end) {
                    ctx.reply("Уроки закінчились, відпочивайте! 🫂");
                    return;
                }
                if (time >= schedule[day][i].start && time <= schedule[day][i].end) {
                    link = schedule[day][i].link;
                    name = schedule[day][i].name;
                    sent = schedule[day][i].sent || false;
                    schedule[day][i].sent = true;
                    break;
                }
                if (time >= schedule[day][i].end && time <= schedule[day][i + 1].start) {
                    link = schedule[day][i + 1].link;
                    name = schedule[day][i + 1].name;
                    sent = schedule[day][i + 1].sent || false;
                    is_next = true;
                    schedule[day][i + 1].sent = true;
                    break;
                }
            }
        }
        return [link, name, sent, is_next];
    }

    public async setTimer(gid: string | number) {
        const data = await this.automaticLink();
        const link = data[0];
        const name = data[1];
        const sent = data[2];
        if (link && !Array.isArray(link) && name && !sent) {
            await this.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${link}`, {
                disable_web_page_preview: true,
                parse_mode: "HTML",
            });
            await this.logger?.info(`Sent link to | ${gid} |`);
        } else if (link && Array.isArray(link) && name && !sent) {
            const week = moment().isoWeek() % 2;
            switch (name) {
                case "📚 Англійська":
                    await this.api.sendMessage(
                        gid,
                        `<b>Починається урок</b> <code>${name}</code> \n1. [Чепурна](${link[0]})\n2. [Дунько](${link[1]})`,
                        { disable_web_page_preview: true, parse_mode: "HTML" },
                    );
                    await this.logger?.info(`Sent link to | ${gid} |`);
                    break;
                case "💻 Інформатика":
                    await this.api.sendMessage(
                        gid,
                        `<b>Починається урок</b> <code>${name}</code> \n1. [Беднар](${link[0]})\n2. [Шеремет](${link[1]})`,
                        { disable_web_page_preview: true, parse_mode: "HTML" },
                    );
                    await this.logger?.info(`Sent link to | ${gid} |`);
                    break;
                case "🎨 Мистецтво | 📜 Основи здоров'я":
                    if (week == 1) {
                        await this.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${link[1]}`, {
                            disable_web_page_preview: true,
                            parse_mode: "HTML",
                        });
                        await this.logger?.info(`Sent link to | ${gid} |`);
                    } else {
                        await this.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${link[0]}`, {
                            disable_web_page_preview: true,
                            parse_mode: "HTML",
                        });
                        await this.logger?.info(`Sent link to | ${gid} |`);
                    }
                    break;
                case "🌍 Географія | 📜 Історія України":
                    if (week == 1) {
                        await this.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${link[1]}`, {
                            disable_web_page_preview: true,
                            parse_mode: "HTML",
                        });
                        await this.logger?.info(`Sent link to | ${gid} |`);
                    } else {
                        await this.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${link[0]}`, {
                            disable_web_page_preview: true,
                            parse_mode: "HTML",
                        });
                        await this.logger?.info(`Sent link to | ${gid} |`);
                    }
                    break;
            }
        }
    }
}
