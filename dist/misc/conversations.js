"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjects = exports.menu = void 0;
const menu_1 = require("@grammyjs/menu");
const choosed_day = (day, ctx, variable) => {
    const i18ndays = {
        "Понеділок": "monday",
        "Вівторок": "tuesday",
        "Середа": "wednesday",
        "Четвер": "thursday",
        "П'ятниця": "friday",
    };
    ctx.reply(`Ви обрали ${day}`);
    variable = i18ndays[day];
};
let day = "";
exports.menu = new menu_1.Menu("root")
    .text("Понеділок", (ctx) => choosed_day("Понеділок", ctx, day))
    .text("Вівторок", (ctx) => choosed_day("Вівторок", ctx, day)).row()
    .text("Середа", (ctx) => choosed_day("Середа", ctx, day))
    .text("Четвер", (ctx) => choosed_day("Четвер", ctx, day))
    .text("П'ятниця", (ctx) => choosed_day("П'ятниця", ctx, day));
async function subjects(cvt, ctx) {
    day = "";
    await ctx.reply("*Оберіть день* (натисніть на кнопку)", { reply_markup: exports.menu });
    await cvt.waitFor("inline_query");
    await ctx.reply("*Вкажіть свій розклад 🗓️:*\nФормат вводу: `8:00, 9:30, Інформатика, https://meet.google.com/abc-123`");
    const { msg: { text } } = await cvt.waitFor("message:text");
    if (!text)
        return;
    const schedule = text.split("\n").map((line) => {
        const [start, end, subject, link] = line.split(", ");
        return { start, end, subject, link };
    });
    await ctx.reply("Вітаю! Ви успішно оновили розклад! 🎉");
}
exports.subjects = subjects;
