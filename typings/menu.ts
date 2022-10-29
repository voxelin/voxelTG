import { Menu } from "@grammyjs/menu";
import { schedule } from "../data/schedule";
import { v4 as uuidv4 } from "uuid";
import { botcontext } from "./bot";
import moment from "moment-timezone";

export const show_schedule = (day: string) => {
    const week = moment().tz('Europe/Kyiv').isoWeek() % 2;
    const days_i18n: {[day: string]: string} = {
        "Monday": "Понеділок",
        "Tuesday": "Вівторок",
        "Wednesday": "Середа",
        "Thursday": "Четвер",
        "Friday": "П'ятниця",
    }
    let message = `🗓️ *Графік на* _${days_i18n[day]}_:\n`;
    if (day != "Saturday" && day != "Sunday") {
        schedule[day].forEach((item) => {
            switch (item.name) {
                case "📚 Англійська":
                    message += `⚬ _${item.start}_-_${item.end}_ — ${item.name} ([Чепурна](${item.link[0]}) | [Дунько](${item.link[1]}))\n`;
                    break;
                case "💻 Інформатика":
                    message += `⚬ _${item.start}_-_${item.end}_ — ${item.name} ([Беднар](${item.link[0]}) | [Шеремет](${item.link[1]}))\n`;
                    break;
                case "🎨 Мистецтво | 📜 Основи здоров'я":
                    if (week == 1) {
                        message += `⚬ _${item.start}_-_${item.end}_ — [📜 Основи здоров'я](${item.link[1]})\n`;
                    } else {
                        message += `⚬ _${item.start}_-_${item.end}_ — [🎨 Мистецтво](${item.link[0]})\n`;
                    }
                    break;
                case "🌍 Географія | 📜 Історія України":
                    if (week == 1) {
                        message += `⚬ _${item.start}_-_${item.end}_ — [📜 Історія України](${item.link[1]})\n`;
                    } else {
                        message += `⚬ _${item.start}_-_${item.end}_ — [🌍 Географія](${item.link[0]})\n`;
                    }
                    break;
                default:
                    message += `⚬ _${item.start}_-_${item.end}_ — [${item.name}](${item.link})\n`;
            }
        });
    } else {
        message = "❌ *Сьогодні вихідний!*\n"
    }
    message += "\n`ID: "+ uuidv4() +"`";
    return message;
}

export const schedule_days_menu = new Menu<botcontext>("schedule_days_menu", { onMenuOutdated: "Updated, try now." })
    .text("Понеділок", (ctx) => {
        let s = show_schedule("Monday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
    })
    .text("Вівторок", async (ctx) => {
        let s = show_schedule("Tuesday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
    })
    .text("Середа", async (ctx) => {
        let s = show_schedule("Wednesday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
    }).row()
    .text("Четвер", async (ctx) => {
        let s = show_schedule("Thursday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
    })
    .text("П'ятниця", async (ctx) => {
        let s = show_schedule("Friday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
    })
