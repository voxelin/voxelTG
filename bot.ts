import { Bot } from "grammy";
import { hydrate } from "@grammyjs/hydrate";
import moment from "moment-timezone";
import { schedule } from "./data/schedule";
import { messages } from "./data/messages";
import { botcontext } from './bot.d';
import { parseMode } from "@grammyjs/parse-mode";


const bot = new Bot<botcontext>(<string>process.env.BOT_TOKEN);

moment.tz.setDefault("Europe/Kyiv");

bot.api.config.use(parseMode("HTML"));
bot.use(hydrate());


bot.command("start", (ctx) => {
    ctx.reply("Доступні команди:\n\n" + "/link - посилання на заняття\n" + "/sch - розклад занять\n" + "/help - допомога\n" + "/about - про бота");
});

bot.command("about", (ctx) => {
    ctx.reply("Цей бот був створений для зручного доступу до розкладу занять та посилань на заняття.\n\n" + "Розробник: @ieljit");
});

bot.command("help", (ctx) => {
    ctx.reply("Якщо у вас виникли проблеми з роботою бота, напишіть @ieljit");
});

bot.command("sch", (ctx) => {
    ctx.reply(messages[moment().format("dddd")], { parse_mode: "MarkdownV2" });
});


const sendlink = () => {
    let day = moment().format("dddd");
    let time = moment().format("HH:mm");
    let link = "";
    let sent = false;
    let name = "";
    for (let i = 0; i < schedule[day].length; i++) {
        if (time >= schedule[day][i].start && time <= schedule[day][i].end) {
            link = schedule[day][i].link;
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