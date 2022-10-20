import { urls, mgs } from './index.d';
import { Bot } from "grammy";
import moment from "moment-timezone";
moment.tz.setDefault("Europe/Kyiv");
const bot = new Bot(<string>process.env.BOT_TOKEN);
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { readFileSync } from "fs";
const messages: mgs = JSON.parse(readFileSync("./data/messages.json", "utf-8"));
const links: urls = JSON.parse(readFileSync("./data/links.json", "utf-8"));
const schedule: { [key: string]: { start: string, end: string, link: string, name: string }[] } = {
    "Monday": [{ start: "08:15", end: "09:00", link: links["German"], name: "💬 Німецька" },
    { start: "09:15", end: "10:00", link: links["Physics"], name: "🔬 Фізика" },
    { start: "10:15", end: "11:00", link: links["English"], name: "📚 Англійська" },
    { start: "11:15", end: "12:00", link: links["Chemistry"], name: "🧪 Хімія" },
    { start: "12:10", end: "12:55", link: links["Algebra"], name: "📐 Алгебра" },
    { start: "13:05", end: "13:50", link: links["Ukrainian"], name: "📚 Українська мова" },
    ],
    "Tuesday": [
        { start: "08:15", end: "09:00", link: links["FLit"], name: "📚 Зарубіжна література" },
        { start: "09:15", end: "10:00", link: links["Art"], name: "🎨 Мистецтво" },
        { start: "10:15", end: "11:00", link: links["Geometry"], name: "📐 Геометрія" },
        { start: "11:15", end: "12:00", link: links["UkrainianLit"], name: "📚 Українська література" },
        { start: "12:10", end: "12:55", link: links["History"], name: "📜 Історія" },
        { start: "13:05", end: "13:50", link: links["Ukrainian"], name: "📚 Українська мова" },
        { start: "14:00", end: "14:45", link: links["Geography"], name: "🌍 Географія" },
    ],
    "Wednesday": [
        { start: "08:15", end: "09:00", link: links["History"], name: "📜 Історія" },
        { start: "09:15", end: "10:00", link: links["Physics"], name: "🔬 Фізика" },
        { start: "10:15", end: "11:00", link: links["English"], name: "📚 Англійська" },
        { start: "11:15", end: "12:00", link: links["Chemistry"], name: "🧪 Хімія" },
        { start: "12:10", end: "12:55", link: links["English"], name: "📚 Англійська" },
        { start: "13:05", end: "13:50", link: links["Informatics"], name: "💻 Інформатика" },
        { start: "14:00", end: "14:45", link: links["Biology"], name: "🦠 Біологія" },
    ],
    "Thursday": [
        { start: "08:15", end: "09:00", link: links["Algebra"], name: "📐 Алгебра" },
        { start: "09:15", end: "10:00", link: links["FLit"], name: "📚 Зарубіжна література" },
        { start: "10:15", end: "11:00", link: links["Physics"], name: "🔬 Фізика" },
        { start: "11:15", end: "12:00", link: links["Law"], name: "📜 Правознавство" },
        { start: "12:10", end: "12:55", link: links["German"], name: "💬 Німецька" },
        { start: "13:05", end: "13:50", link: links["English"], name: "📚 Англійська" },
        { start: "14:00", end: "14:45", link: links["Geography"], name: "🌍 Географія" },
    ],
    "Friday": [
        { start: "009:15", end: "10:00", link: links["UkrainianLit"], name: "📚 Українська література" },
        { start: "10:15", end: "11:00", link: links["English"], name: "📚 Англійська" },
        { start: "11:15", end: "12:00", link: links["Biology"], name: "🦠 Біологія" },
        { start: "12:10", end: "12:55", link: links["Geometry"], name: "📐 Геометрія" },
        { start: "13:05", end: "13:50", link: links["Informatics"], name: "💻 Інформатика" },
    ],
}
bot.api.config.use(parseMode("HTML"));
bot.command("start", (ctx) => {
    ctx.reply("Шо ти, чєпуха?");
});
bot.command("sch", (ctx) => {
    ctx.reply(messages[moment().format("dddd")], { parse_mode: "MarkdownV2" });
});

const sendlink = () => {
    let day = moment().format("dddd");
    let time = moment().format("HH:mm");
    let link = "";
    let name = "";
    for (let i = 0; i < schedule[day].length; i++) {
        if (time >= schedule[day][i].start && time <= schedule[day][i].end) {
            link = schedule[day][i].link;
            name = schedule[day][i].name;
            break;
        }
    }
    return [link, name];
}


setInterval(() => {
    let data = sendlink();
    let link = data[0];
    let name = data[1];
    if(link != "") {
        bot.api.sendMessage(<string>process.env.GROUP_ID, `<b>Починається урок ${name}</b> \n${link}`);
    }
}, 1000 * 60 * 45);

bot.command("link", async (ctx) => {
    let data = sendlink();
    let link = data[0];
    let name = data[1];
    if (link != "") {
        ctx.reply(`<b>${name}</b> \n${link}`);
    } else {
        ctx.reply("Немає уроків");
    }
});

bot.start();