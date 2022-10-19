import { Bot } from "grammy";
import moment from "moment-timezone";
moment.tz.setDefault("Europe/Kyiv");
const bot = new Bot("5749746961:AAE1bsHbHm4KUywbOA0bhPls4PvEoMqf6js")
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
bot.api.config.use(parseMode("MarkdownV2"));
const links = {
    "Deutsch": "https://us05web.zoom.us/j/3942975249?pwd=ZUpwTGxlQWNjYWlNU1Zua1o1RGoxZz09",
    "Physics": "https://us05web.zoom.us/j/8947641185?pwd=WS9aOE9OQnRFalU2SjAzVUxPMGIrUT09",
    "EnglishA": "https://us04web.zoom.us/j/9643428378?pwd=ZVBQbUxhUXRBMnZoOWRyWHFkalBKUT09",
    "EnglishB": "https://ieljit.lol/Unknown",
    "Chemistry": "https://us04web.zoom.us/j/3666591773 (Code: 242295)",
    "Algebra": "https://us04web.zoom.us/j/2916115479?pwd=MlZ2bnpWZy9IUkpjVUpPSkhSN0g0QT09",
    "ULanguage": "https://us05web.zoom.us/j/7353173624?pwd=aDNmdVVxbU5mOG8rVUc5clRhTjBEUT09",
    "Biology": "https://us05web.zoom.us/j/5767269339?pwd=MVlXMFJ3VGJnenZDb2M5SWRBNlJBdz09",
    "Geography": "https://us05web.zoom.us/j/5603703875?pwd=RnJnaThsVXpsQXZ0UG1sUnRNOGgxQT09",
    "History": "https://us05web.zoom.us/j/2729538733?pwd=L29wdDEybjNSYlVqTzBxMlRtdW93dz09",
    "FLit": "https://us04web.zoom.us/j/72684571864?pwd=bC9yeTQQ3uWIYwGhnNb90BwuTZbvuA.1",
    "Art": "https://us04web.zoom.us/j/9276332346?pwd=eDN5WG9TNjFMSXNkeTZxMEpnNFVtdz09"
}
const schedule: any = {
    "Monday": {
        "8:15": links.Deutsch,
        "9:15": links.Physics,
        "10:15": links.EnglishA + " \n" + links.EnglishB,
        "11:15": links.Chemistry,
        "12:10": links.Algebra,
    },
    "Tuesday": {
        "8:15": links.FLit,
        "9:15": links.Art,
        "10:15": links.Algebra,
        "11:15": links.ULanguage,
        "12:10": links.History,
        "13:10": links.ULanguage,
        "13:55": links.Geography,
    },
    "Wednesday": {
        "8:15": links.History,
        "9:15": links.Physics,
        "10:15": links.EnglishA + " \n" + links.EnglishB,
        "11:15": links.Chemistry,
        "12:10": links.EnglishA + " \n" + links.EnglishB,
        "13:10": links.Algebra,
        "13:55": links.Biology,
    },
    "Thursday": {
        "8:15": links.Algebra,
        "9:15": links.FLit,
        "10:15": links.Physics,
        "11:15": links.EnglishB,
        "12:10": links.Deutsch,
        "13:10": links.EnglishA + " \n" + links.EnglishB,
        "13:55": links.Geography,
    }
}

const messages: any = {
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
}
bot.command("start", (ctx) => {
    ctx.reply("Hello, I am TBH, made by @ieljit!");
});
bot.command("sch", (ctx) => {
    ctx.reply(messages[moment().format("dddd")]);
});


// Send link to the group chat automatically by time
const sendlink = () => {
    const day = moment().format("dddd");
    const time = moment().format("HH:mm");
    const link = schedule[day][time];
    console.log(day, time, link);
    if (link) {
        bot.api.sendMessage("-820981600", link);
    }
}
setInterval(sendlink, 1000 * 60);


bot.start();