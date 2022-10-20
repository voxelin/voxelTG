import { Bot } from "grammy";
import moment from "moment-timezone";
moment.tz.setDefault("Europe/Kyiv");
const bot = new Bot(<string>process.env.BOT_TOKEN);
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { readFileSync } from "fs";
bot.api.config.use(parseMode("HTML"));
const messages: {[key: string]: string} = JSON.parse(readFileSync("./phrases/messages.json", "utf-8"));
const links: {[key: string]: string} = JSON.parse(readFileSync("./phrases/links.json", "utf-8"));
// Copy schedule from messages
const link_schedule: any = {
    "Monday": {
        "08:15": links["German"],
        "09:15": links["Physics"],
        "10:15": links["English"],
        "11:15": links["Chemistry"],
        "12:10": links["Algebra"],
        "13:10": links["Ukrainian"],
    },
    "Tuesday": {
        "08:15": links["FLit"],
        "09:15": links["Art"],
        "10:15": links["Geometry"],
        "11:15": links["UkrainianLit"],
        "12:10": links["History"],
        "13:10": links["Ukrainian"],
        "13:55": links["Geography"],
    },
    "Wednesday": {
        "08:15": links["History"],
        "09:15": links["Physics"],
        "10:15": links["English"],
        "11:15": links["Chemistry"],
        "12:10": links["English"],
        "13:10": links["Informatics"],
        "13:55": links["Biology"],
    },
    "Thursday": {
        "08:15": links["Algebra"],
        "09:15": links["FLit"],
        "10:15": links["Physics"],
        "11:15": links["Law"],
        "12:10": links["German"],
        "13:10": links["English"],
        "13:55": links["Geography"],
    },
    "Friday": {
        "09:15": links["UkrainianLit"],
        "10:15": links["English"],
        "11:15": links["Biology"],
        "12:10": links["Geometry"],
        "13:10": links["Informatics"],
    },
}
let ongoing = "";

bot.command("start", (ctx) => {
    ctx.reply("Шо ти, чєпуха?");
});
bot.command("sch", (ctx) => {
    ctx.reply(messages[moment().format("dddd")], {parse_mode: "MarkdownV2"});
});
bot.command("link", (ctx) => {
    if (ongoing == "") {
        ctx.reply("Наразі немає посилань на заняття!");
    } else {
        ctx.reply(`Посилання на заняття: ${ongoing}`);
    }
});

// Send link to the group chat automatically by time
const sendlink = () => {
    const day = moment().format("dddd");
    const time = moment().format("HH:mm");
    const link = link_schedule[day][time];
    if (link) {
        console.log(day, time, link);
        ongoing = link;
        bot.api.sendMessage("-1001194355855", link);
    }
}
setInterval(sendlink, 1000 * 60);

bot.start();