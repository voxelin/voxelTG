import { Menu } from "@grammyjs/menu";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import { schedule } from "../data/schedule";
import { CustomContext } from "./bot";

export const show_schedule = (day: string) => {
    const week = moment().tz("Europe/Kyiv").isoWeek() % 2;
    const time = moment().tz("Europe/Kyiv").format("HH:mm");
    const days_i18n: { [day: string]: string } = {
        Monday: "Понеділок",
        Tuesday: "Вівторок",
        Wednesday: "Середа",
        Thursday: "Четвер",
        Friday: "П'ятниця",
    };
    let message = `🗓️ *Графік на* _${days_i18n[day]}_:\n`;
    const ongoing = (timestart: string, timeend: string) => {
        return time >= timestart && time <= timeend;
    };
    if (day != "Saturday" && day != "Sunday") {
        schedule[day].forEach((item) => {
            if (ongoing(item.start, item.end)) {
                message += `● `;
            } else {
                message += `○ `;
            }
            switch (item.name) {
                case "📚 Англійська":
                    message += `_${item.start}_-_${item.end}_ — ${item.name} ([Чепурна](${item.urls[0]}) | [Дунько](${item.urls[1]}))\n`;
                    break;
                case "💻 Інформатика":
                    message += `_${item.start}_-_${item.end}_ — ${item.name} ([Беднар](${item.urls[0]}) | [Шеремет](${item.urls[1]}))\n`;
                    break;
                case "🎨 Мистецтво | 📜 Основи здоров'я":
                    if (week == 1) {
                        message += `_${item.start}_-_${item.end}_ — [📜 Основи здоров'я](${item.urls[1]})\n`;
                    } else {
                        message += `_${item.start}_-_${item.end}_ — [🎨 Мистецтво](${item.urls[0]})\n`;
                    }
                    break;
                case "🌍 Географія | 📜 Історія України":
                    if (week == 1) {
                        message += `_${item.start}_-_${item.end}_ — [📜 Історія України](${item.urls[1]})\n`;
                    } else {
                        message += `_${item.start}_-_${item.end}_ — [🌍 Географія](${item.urls[0]})\n`;
                    }
                    break;
                default:
                    message += `_${item.start}_-_${item.end}_ — [${item.name}](${item.urls})\n`;
            }
        });
    } else {
        message = "❌ *Сьогодні вихідний!*\n";
    }
    message += "\n`ID: " + uuidv4() + "`";
    return message;
};

export const schedule_days_menu = new Menu<CustomContext>("schedule_days_menu", { onMenuOutdated: "Updated, try now." })
    .text("Понеділок", (ctx) => {
        const s = show_schedule("Monday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true });
    })
    .text("Вівторок", async (ctx) => {
        const s = show_schedule("Tuesday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true });
    })
    .text("Середа", async (ctx) => {
        const s = show_schedule("Wednesday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true });
    })
    .row()
    .text("Четвер", async (ctx) => {
        const s = show_schedule("Thursday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true });
    })
    .text("П'ятниця", async (ctx) => {
        const s = show_schedule("Friday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true });
    });
