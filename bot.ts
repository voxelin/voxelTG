import { Bot, Context, session } from "grammy";
import { hydrate } from "@grammyjs/hydrate";
import { schedule } from "./data/schedule";
import { botcontext } from './typings/bot';
import { parseMode } from "@grammyjs/parse-mode";
import { schedule_days_menu, show_schedule } from "./typings/menu";
import { autoRetry } from "@grammyjs/auto-retry";
import { run, sequentialize } from "@grammyjs/runner";
import { Logtail } from "@logtail/node";
import moment from "moment-timezone";

const bot = new Bot<botcontext>(String(process.env.BOT_TOKEN));
const logger = new Logtail(String(process.env.LOGTAIL_TOKEN));

function getSessionKey(ctx: Context) {
    return ctx.chat?.id.toString();
}

moment.tz.setDefault("Europe/Kyiv");

bot.api.config.use(parseMode("HTML"));
bot.use(hydrate());
bot.use(schedule_days_menu);
bot.use(sequentialize(getSessionKey))
bot.use(session({ getSessionKey }));
bot.api.config.use(autoRetry());

const commands = [
    "/start - Основні відомості про бота та команди",
    "/help - Контакти для допомоги",
    "/link - Посилання на заняття",
    "/schedule - Розклад занять"
]

bot.command("start", (ctx) => {
    let message: string = "*Список команд:*\n";
    commands.forEach((command) => {
        message += command + "\n";
    });
    ctx.reply(message, { parse_mode: "Markdown" });
});

bot.command("about", (ctx) => {
    ctx.reply("Цей бот був створений для зручного доступу до розкладу занять та посилань на заняття.\n\n" + "Розробник: @ieljit");
});

bot.command("help", (ctx) => {
    ctx.reply("Якщо у вас виникли проблеми з роботою бота, напишіть @ieljit");
    logger.info(`Help command was used by | ${ctx.from?.username || ctx.from?.first_name} |.`);
});

bot.command("schedule", (ctx) => {
    ctx.reply(show_schedule(moment().format("dddd")), { parse_mode: "Markdown", reply_markup: schedule_days_menu, disable_web_page_preview: true });
});

const sendlink = () => {
    let day = moment().format("dddd");
    let time = moment().format("HH:mm");
    let link: string | string[] = "";
    let sent = false;
    let name = "";
    if (day != "Saturday" && day != "Sunday") {
        for (let i = 0; i < schedule[day].length; i++) {
            if (time >= schedule[day][i].start && time <= schedule[day][i].end) {
                link = schedule[day][i].link;
                name = schedule[day][i].name;
                sent = schedule[day][i].sent || false;
                schedule[day][i].sent = true
                break;
            }
        }
    } else {
        return [false, false, false];
    }
    return [link, name, sent];
}

setInterval(() => {
    let data = sendlink();
    let link = data[0];
    let name = data[1];
    let sent = data[2];
    if (link != "" && name && !sent) {
        bot.api.sendMessage(String(process.env.GROUP_ID), `<b>Починається урок ${name}</b> \n${link}`, { disable_web_page_preview: true, parse_mode: "HTML" });
        logger.info(`Link was sent automaticly: ${name}`);
    } else if (Array.isArray(link)) {
        bot.api.sendMessage(String(process.env.GROUP_ID), `<b>Починається урок ${name}</b> \n1. ${link[0]}\n2. ${link[1]}`, { disable_web_page_preview: true, parse_mode: "HTML" });
        logger.info(`Double link was sent automaticly: ${name}`);
    }
}, 1000 * 60);

bot.command("link", (ctx) => {
    let data = sendlink();
    let link = data[0];
    let name = data[1];
    if (link != "") {
        ctx.reply(`<b>${name}</b> \n${link}`);
        logger.info(`Link was requested by ${ctx.from?.username || ctx.from?.first_name}: ${name}`);
    } else {
        ctx.reply("Посилання на урок немає у моїй базі даних. 🤔");
        logger.info(`Link was requested by ${ctx.from?.username || ctx.from?.first_name}: Not sent`);
    }
});

run(bot);
