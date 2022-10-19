import { Bot } from "grammy";
import moment from "moment-timezone";
moment.tz.setDefault("Europe/Kyiv");
const bot = new Bot("5749746961:AAE1bsHbHm4KUywbOA0bhPls4PvEoMqf6js")
let sent = false;

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

const messages = {
    "Monday": `Графік на сьогодні:
    8:15 - Німецька
    9:15 - Фізика
    10:15 - Англійська А
    11:15 - Хімія
    12:10 - Алгебра`,
    "Tuesday": `Графік на сьогодні:
    8:15 - Зарубіжна література
    9:15 - Мистецтво
    10:15 - Алгебра
    11:15 - Українська література
    12:10 - Історія
    13:10 - Українська мова
    13:55 - Географія`,
    "Wednesday": `Графік на сьогодні:
    8:15 - Історія
    9:15 - Фізика
    10:15 - Англійська А
    11:15 - Хімія
    12:10 - Англійська Б
    13:10 - Алгебра
    13:55 - Біологія`,
    "Thursday": `Графік на сьогодні:
    8:15 - Алгебра
    9:15 - Зарубіжна література
    10:15 - Фізика
    11:15 - Англійська Б
    12:10 - Німецька
    13:10 - Англійська А
    13:55 - Географія`,
    "Friday": ``,
    "Saturday": "У нас сьогодні вихідний!",
    "Sunday": "У нас сьогодні вихідний!",
}
bot.command("start", (ctx) => {
    ctx.reply("Hello, I am TBH, made by @ieljit!");
});
bot.command("sch", (ctx) => {
    ctx.reply(`Графік занять на сьогодні: ${schedule[moment().format("dddd")]}`);
});


// Send link to the group chat automatically by time
const sendlink = () => {
    const day = moment().format("dddd");
    const time = moment().format("HH:mm");
    const link = schedule[day][time];
    console.log(day, time, link);
    if (link) {
        bot.api.sendMessage("-820981600", link);
        sent = true;
    }
}
setInterval(sendlink, 1000 * 60);


bot.start();