import { Bot } from "grammy";
import { hydrate } from "@grammyjs/hydrate";
import moment from "moment-timezone";
import { schedule } from "./data/schedule";
import { botcontext } from './bot.d';
import { parseMode } from "@grammyjs/parse-mode";


const bot = new Bot<botcontext>(<string>process.env.BOT_TOKEN);

moment.tz.setDefault("Europe/Kyiv");

bot.api.config.use(parseMode("HTML"));
bot.use(hydrate());

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
});

bot.command("schedule", async (ctx) => {
    let day = moment().format("dddd");
    let message = "🗓️ *Графік на сьогодні*:\n";
    schedule[day].forEach((item) => {
        switch (item.name) {
            case "📚 Англійська":
                message += `     ⚬ _${item.start}_-_${item.end}_ — ${item.name} ([Чепурна](${item.link[0]}) | [Дунько](${item.link[1]}))\n`;
                break;
            case "💻 Інформатика":
                message += `     ⚬ _${item.start}_-_${item.end}_ — ${item.name} ([Беднар](${item.link[0]}) | [Шеремет](${item.link[1]}))\n`;
                break;
            default:
                message += `     ⚬ _${item.start}_-_${item.end}_ — [${item.name}](${item.link})\n`;
        }
    });
    await ctx.reply(message, { parse_mode: "Markdown" });
});

const sendlink = () => {
    let day = moment().format("dddd");
    let time = moment().format("HH:mm");
    let link = "";
    let sent = false;
    let name = "";
    for (let i = 0; i < schedule[day].length; i++) {
        if (time >= schedule[day][i].start && time <= schedule[day][i].end) {
            link = String(schedule[day][i].link);
            name = schedule[day][i].name;
            sent = schedule[day][i].sent || false;
            schedule[day][i].sent = true
            break;
        }
    }
    return [link, name, sent];
}


setInterval(() => {
    let data = sendlink();
    let link = data[0];
    let name = data[1];
    let sent = data[2];
    if (link != "" && !sent) {
        bot.api.sendMessage(<string>process.env.GROUP_ID, `<b>Починається урок ${name}</b> \n${link}`);
    }
}, 1000 * 60);


bot.command("link", async (ctx) => {
    let data = sendlink();
    let link = data[0];
    let name = data[1];
    if (link != "") {
        ctx.reply(`<b>${name}</b> \n${link}`);
    } else {
        ctx.reply("Зараз перерва або ж уроки закінчились. 🤔");
    }
});

bot.start();