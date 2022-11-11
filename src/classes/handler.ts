import moment from "moment-timezone";
import { schedule } from "../data/schedule";
import { CustomContext } from "../typings/bot";
import { schedule_days_menu, show_schedule } from "../typings/menu";
import { SchedulerBot } from "./core";
import { CommandHandlerError } from "./errors";
export class CommandHandler<C extends CustomContext = CustomContext> {
    constructor(private readonly sysHandlers: SystemHandler<C>) {}
    public async start(ctx: C) {
        await ctx.reply("Працюю на благо учнів ліцею 🤖\nАвтор: @voxelin", { parse_mode: "Markdown" });
    }
    public async help(ctx: C) {
        await ctx.reply("Якщо у вас виникли проблеми з роботою бота, повідомте @voxelin 🙂");
    }
    public async about(ctx: C) {
        await ctx.reply(
            "Цей бот був створений для зручного доступу до розкладу занять та посилань на заняття.\n" +
                "Розробник: @voxelin",
        );
    }
    public async link(ctx: C) {
        if (moment().format("dddd") == "Sunday" || moment().format("dddd") == "Saturday")
            return await ctx.reply("Сьогодні вихідний, занять немає! 🤗");
        const data = this.sysHandlers.handleLink(true);
        if (Object.keys(data).length === 0) return ctx.reply("Уроки закінчились, відпочивайте! 🫂");
        const week = moment().isoWeek() % 2;
        const [urls, next] = [data["urls"], data["next"]];
        let name = data["name"];
        switch (name) {
            case "🎨 Мистецтво | 📜 Основи здоров'я":
                if (week == 1) {
                    name = "📜 Основи здоров'я";
                } else {
                    name = "🎨 Мистецтво";
                }
                break;
            case "🌍 Географія | 📜 Історія України":
                if (week == 1) {
                    name = "📜 Історія України";
                } else {
                    name = "🌍 Географія";
                }
                break;
            case "📚 Англійська":
                urls![0] = `1. <a href="${urls![0]}">Чепурна</a>\n2. <a href="${urls![1]}">Дунько</a>`;
                break;
            case "💻 Інформатика":
                urls![0] = `1. <a href="${urls![0]}">Беднар</a>\n2. <a href="${urls![1]}">Шеремет</a>`;
                break;
            default:
                break;
        }
        if (urls?.length != 0) {
            next == true
                ? await ctx.reply(`Посилання на наступний урок: <b>${name}</b> \n${urls![0]}`)
                : await ctx.reply(`Урок <b>${name}</b> вже почався: \n${urls![0]}`);
        } else {
            await ctx.reply("На жаль, на урок <code>" + name + "</code> посилання немає. 🤔");
        }
    }
    public async schedule(ctx: C) {
        await ctx.reply(show_schedule(moment().format("dddd")), {
            parse_mode: "Markdown",
            reply_markup: schedule_days_menu,
            disable_web_page_preview: true,
        });
    }
}

export class SystemHandler<C extends CustomContext> {
    public commandHandler: CommandHandler<C>;
    constructor(private readonly bot: SchedulerBot<C>) {
        this.commandHandler = new CommandHandler<C>(this);
    }

    public async handleTime(gid: number) {
        const data = this.handleLink();
        if (!data.urls && data.name == "") return;
        const [urls, name, sent] = [data.urls, data.name, data.sent];
        const week = moment().isoWeek() % 2;
        if (urls?.length == 0) return;
        if (urls?.length == 1) {
            if (sent == false) {
                await this.bot.api.sendMessage(gid, `<b>Починається урок</b> <code>${name}</code> \n${urls[0]}`, {
                    parse_mode: "HTML",
                });
            }
        } else if (urls?.length == 2) {
            switch (name) {
                case "📚 Англійська":
                    await this.bot.api.sendMessage(
                        gid,
                        `<b>Починається урок</b> <code>${name}</code> \n1. <a href="${urls[0]}">Чепурна</a>\n2. <a href="${urls[1]}">Дунько</a>`,
                        { disable_web_page_preview: true, parse_mode: "HTML" },
                    );
                    break;
                case "💻 Інформатика":
                    await this.bot.api.sendMessage(
                        gid,
                        `<b>Починається урок</b> <code>${name}</code> \n1. <a href="${urls[0]}">Беднар</a>\n2. <a href="${urls[1]}">Шеремет</a>`,
                        { disable_web_page_preview: true, parse_mode: "HTML" },
                    );
                    break;
                case "🎨 Мистецтво | 📜 Основи здоров'я":
                    if (week == 1) {
                        await this.bot.api.sendMessage(
                            gid,
                            `<b>Починається урок</b> <code>📜 Основи здоров'я</code> \n${urls[1]}`,
                            {
                                disable_web_page_preview: true,
                                parse_mode: "HTML",
                            },
                        );
                    } else {
                        await this.bot.api.sendMessage(
                            gid,
                            `<b>Починається урок</b> <code>🎨 Мистецтво</code> \n${urls[0]}`,
                            {
                                disable_web_page_preview: true,
                                parse_mode: "HTML",
                            },
                        );
                    }
                    break;
                case "🌍 Географія | 📜 Історія України":
                    if (week == 1) {
                        await this.bot.api.sendMessage(
                            gid,
                            `<b>Починається урок</b> <code>📜 Історія України</code> \n${urls[1]}`,
                            {
                                disable_web_page_preview: true,
                                parse_mode: "HTML",
                            },
                        );
                    } else {
                        await this.bot.api.sendMessage(
                            gid,
                            `<b>Починається урок</b> <code>🌍 Географія</code> \n${urls[0]}`,
                            {
                                disable_web_page_preview: true,
                                parse_mode: "HTML",
                            },
                        );
                    }
                    break;
            }
        }
    }
    public handleLink(handleRequest = false): { urls?: string[]; name?: string; next?: boolean; sent?: boolean } {
        const day = moment().format("dddd");
        const time = moment().format("HH:mm");
        let _next = false;
        let _name = "";
        let _urls: string[] = [];
        let _sent = false;
        if (!["Sunday", "Saturday"].includes(day)) {
            for (let i = 0; i < schedule[day].length; i++) {
                if (time >= schedule[day][schedule[day].length - 1].end) {
                    return {};
                }
                if (handleRequest) {
                    if (time >= schedule[day][i].start && time <= schedule[day][i].end) {
                        _sent = schedule[day][i].sent ?? false;
                        _urls = schedule[day][i].urls;
                        _name = schedule[day][i].name;
                        schedule[day][i].sent = true;
                        break;
                    }
                    if (time >= schedule[day][i].end && time <= schedule[day][i + 1].start) {
                        _sent = schedule[day][i + 1].sent ?? false;
                        _urls = schedule[day][i + 1].urls;
                        _name = schedule[day][i + 1].name;
                        _next = true;
                        schedule[day][i + 1].sent = true;
                        break;
                    }
                } else {
                    if (time >= schedule[day][i].start && time <= schedule[day][i].end && !schedule[day][i].sent) {
                        _sent = schedule[day][i].sent ?? false;
                        _urls = schedule[day][i].urls;
                        _name = schedule[day][i].name;
                        schedule[day][i].sent = true;
                        break;
                    }
                }
            }
        } else {
            return {};
        }
        return { urls: _urls, name: _name, next: _next, sent: _sent };
    }

    public async handleCommand(ctx: C, command?: string) {
        if (!command)
            throw new CommandHandlerError(
                "No command trigger provided. Please, provide a trigger without slash, e.g /start -> start",
            );
        if (command.startsWith("/")) {
            throw new CommandHandlerError(
                "Command trigger should not start with slash. Please, provide a trigger without slash, e.g /start -> start",
            );
        }
        try {
            await this.commandHandler[command as keyof CommandHandler](ctx);
        } catch (e) {
            if (e instanceof TypeError) {
                return;
            } else if (e instanceof CommandHandlerError) {
                await ctx.reply("Помилка обробки команди. Повідомте @voxelin 🙂");
            } else {
                console.error(e);
            }
        }
    }
}
