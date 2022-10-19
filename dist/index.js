"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Europe/Kyiv");
const bot = new grammy_1.Bot(process.env.BOT_TOKEN);
const parse_mode_1 = require("@grammyjs/parse-mode");
bot.api.config.use((0, parse_mode_1.parseMode)("HTML"));
const links = {
    "German": "https://us05web.zoom.us/j/3942975249?pwd=ZUpwTGxlQWNjYWlNU1Zua1o1RGoxZz09",
    "Physics": "https://us05web.zoom.us/j/8947641185?pwd=WS9aOE9OQnRFalU2SjAzVUxPMGIrUT09",
    "English": "https://us04web.zoom.us/j/9643428378?pwd=ZVBQbUxhUXRBMnZoOWRyWHFkalBKUT09",
    "Informatics": "https://us05web.zoom.us/j/2186144205?pwd=QUtFazZ6QWN5REdYMVdFUjZYMHNSQT09",
    "Chemistry": "https://us04web.zoom.us/j/3666591773 (Code: 242295)",
    "Algebra": "https://us04web.zoom.us/j/2916115479?pwd=MlZ2bnpWZy9IUkpjVUpPSkhSN0g0QT09",
    "Geometry": "https://us04web.zoom.us/j/2916115479?pwd=MlZ2bnpWZy9IUkpjVUpPSkhSN0g0QT09",
    "Ukrainian": "https://us05web.zoom.us/j/7353173624?pwd=aDNmdVVxbU5mOG8rVUc5clRhTjBEUT09",
    "UkrainianLit": "https://us05web.zoom.us/j/7353173624?pwd=aDNmdVVxbU5mOG8rVUc5clRhTjBEUT09",
    "Biology": "https://us05web.zoom.us/j/5767269339?pwd=MVlXMFJ3VGJnenZDb2M5SWRBNlJBdz09",
    "Geography": "https://us05web.zoom.us/j/5603703875?pwd=RnJnaThsVXpsQXZ0UG1sUnRNOGgxQT09",
    "History": "https://us05web.zoom.us/j/2729538733?pwd=L29wdDEybjNSYlVqTzBxMlRtdW93dz09",
    "FLit": "https://us04web.zoom.us/j/72684571864?pwd=bC9yeTQQ3uWIYwGhnNb90BwuTZbvuA.1",
    "Art": "https://us04web.zoom.us/j/9276332346?pwd=eDN5WG9TNjFMSXNkeTZxMEpnNFVtdz09",
    "Law": "https://us05web.zoom.us/j/8796615923?pwd=K3N6YlBuTTNjTjZ6VzNXVENoY2VRUT09"
};
const messages = {
    "Monday": `🗓️ *Графік на сьогодні*:
    ⚬ _8:15_ \\- 💬 Німецька
    ⚬ _9:15_ \\- 🧪 Фізика
    ⚬ _10:15_ \\- 💬 Англійська
    ⚬ _11:15_ \\- 🧪 Хімія
    ⚬ _12:10_ \\- 📈 Алгебра
    ⚬ _13:10_ \\- 📚 Українська мова`,
    "Tuesday": `🗓️ *Графік на сьогодні*:
    ⚬ _8:15_ \\- 📚 Зарубіжна література
    ⚬ _9:15_ \\- 🎨 Мистецтво
    ⚬ _10:15_ \\- 📈 Геометрія
    ⚬ _11:15_ \\- 📚 Українська література
    ⚬ _12:10_ \\- 📚 Історія України
    ⚬ _13:10_ \\- 💬 Українська мова
    ⚬ _13:55_ \\- 🌍 Географія`,
    "Wednesday": `🗓️ *Графік на сьогодні*:
    ⚬ _8:15_ \\- 📚 Всесвітня Історія
    ⚬ _9:15_ \\- 🧪 Фізика
    ⚬ _10:15_ \\- 💬 Англійська
    ⚬ _11:15_ \\- 🧪 Хімія
    ⚬ _12:10_ \\- 💬 Англійська
    ⚬ _13:10_ \\- 📈 Інформатика
    ⚬ _13:55_ \\- 🧪 Біологія`,
    "Thursday": `🗓️ *Графік на сьогодні*:
    ⚬ _8:15_ \\- 📈 Алгебра
    ⚬ _9:15_ \\- 📚 Зарубіжна література
    ⚬ _10:15_ \\- 🧪 Фізика
    ⚬ _11:15_ \\- 💬 Правознавство
    ⚬ _12:10_ \\- 💬 Німецька
    ⚬ _13:10_ \\- 💬 Англійська
    ⚬ _13:55_ \\- 🌍 Географія`,
    "Friday": `🗓️ *Графік на сьогодні*:
    ⚬ _9:15_ \\- 📚 Українська література
    ⚬ _10:15_ \\- 💬 Англійська мова
    ⚬ _11:15_ \\- 🧪 Біологія
    ⚬ _12:10_ \\- 📈 Геометрія
    ⚬ _13:10_ \\- 📈 Інформатика`,
    "Saturday": "У нас сьогодні вихідний!",
    "Sunday": "У нас сьогодні вихідний!",
};
// Copy schedule from messages
const link_schedule = {
    "Monday": {
        "8:15": links["German"],
        "9:15": links["Physics"],
        "10:15": links["English"],
        "11:15": links["Chemistry"],
        "12:10": links["Algebra"],
        "13:10": links["Ukrainian"],
    },
    "Tuesday": {
        "8:15": links["FLit"],
        "9:15": links["Art"],
        "10:15": links["Geometry"],
        "11:15": links["UkrainianLit"],
        "12:10": links["History"],
        "13:10": links["Ukrainian"],
        "13:55": links["Geography"],
    },
    "Wednesday": {
        "8:15": links["History"],
        "9:15": links["Physics"],
        "10:15": links["English"],
        "11:15": links["Chemistry"],
        "12:10": links["English"],
        "13:10": links["Informatics"],
        "13:55": links["Biology"],
    },
    "Thursday": {
        "8:15": links["Algebra"],
        "9:15": links["FLit"],
        "10:15": links["Physics"],
        "11:15": links["Law"],
        "12:10": links["German"],
        "13:10": links["English"],
        "13:55": links["Geography"],
    },
    "Friday": {
        "9:15": links["UkrainianLit"],
        "10:15": links["English"],
        "11:15": links["Biology"],
        "12:10": links["Geometry"],
        "13:10": links["Informatics"],
    },
};
let ongoing = "";
bot.command("start", (ctx) => {
    ctx.reply("Hello, I am TBH, made by @ieljit!");
});
bot.command("sch", (ctx) => {
    ctx.reply(messages[(0, moment_timezone_1.default)().format("dddd")], { parse_mode: "MarkdownV2" });
});
bot.command("link", (ctx) => {
    if (ongoing == "") {
        ctx.reply("Наразі немає посилань на заняття!");
    }
    else {
        ctx.reply(`Посилання на заняття: ${ongoing}`);
    }
});
// Send link to the group chat automatically by time
const sendlink = () => {
    const day = (0, moment_timezone_1.default)().format("dddd");
    const time = (0, moment_timezone_1.default)().format("HH:mm");
    const link = link_schedule[day][time];
    console.log(day, time, link);
    if (link) {
        ongoing = link;
        bot.api.sendMessage("-820981600", link);
    }
};
setInterval(sendlink, 1000 * 60);
bot.start();
