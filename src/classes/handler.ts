import moment from "moment-timezone";
import { CustomContext } from "../typings/bot";
import { schedule_days_menu, show_schedule } from "../typings/menu";
import { SchedulerBot } from "./core";
import { CommandHandlerError } from "./errors";

export class CommandHandler<Context extends CustomContext = CustomContext> {
    constructor(private readonly bot: SchedulerBot<Context>) {}

    public async start(ctx: Context) {
        await ctx.reply("Працюю на благо учнів ліцею 🤖\nАвтор: @voxelin", { parse_mode: "Markdown" });
    }

    public async help(ctx: Context) {
        await ctx.reply("Якщо у вас виникли проблеми з роботою бота, повідомте @voxelin 🙂");
    }

    public async about(ctx: Context) {
        await ctx.reply(
            "Цей бот був створений для зручного доступу до розкладу занять та посилань на заняття.\n" +
                "Розробник: @voxelin",
        );
    }

    public async link(ctx: Context) {
        if (moment().format("dddd") == "Sunday" || moment().format("dddd") == "Saturday")
            return await ctx.reply("Сьогодні вихідний, занять немає 🙂");
        const data = await this.bot.requestLink(ctx);
        const week = moment().isoWeek() % 2;
        const link = data![0];
        let name = data![1];
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
            default:
                break;
        }
        if (link != "") {
            data![3] == true
                ? await ctx.reply(`Посилання на наступний урок: <b>${name}</b> \n${link}`)
                : await ctx.reply(`Урок <b>${name}</b> вже почався: \n${link}`);
        } else {
            await ctx.reply("На жаль, на урок <code>" + name + "</code> посилання немає. 🤔");
        }
    }

    public async schedule(ctx: Context) {
        await ctx.reply(show_schedule(moment().format("dddd")), {
            parse_mode: "Markdown",
            reply_markup: schedule_days_menu,
            disable_web_page_preview: true,
        });
    }

    public async handle(ctx: Context, command?: string) {
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
            await this[command as keyof CommandHandler](ctx);
        } catch (e) {
            if (e instanceof TypeError) {
                return;
            } else if (e instanceof CommandHandlerError) {
                await ctx.reply("Помилка обробки команди. Повідомте @voxelin 🙂");
                this.bot.logger.warn("Command handler failed to process command trigger: " + command);
            } else {
                this.bot.logger.error(String(e));
            }
        }
    }
}
