import { Menu } from "@grammyjs/menu";
import { schedule } from "../data/schedule";
import { v4 as uuidv4 } from "uuid";

export const show_schedule = (day: string) => {
    const days_i18n:any = {
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
                default:
                    message += `⚬ _${item.start}_-_${item.end}_ — [${item.name}](${item.link})\n`;
            }
        });
    } else {
        message = "❌ *Сьогодні вихідний!*"
    }
    message += "\n`ID: "+ uuidv4() +"`";
    return message;
}

export const schedule_days_menu = new Menu("schedule_days_menu", { onMenuOutdated: "Updated, try now." })
    .text("Понеділок", (ctx) => {
        if (ctx.update.message?.from?.id != ctx.from.id) return ctx.answerCallbackQuery("❌ Ви не можете використовувати цю кнопку!");
        let s = show_schedule("Monday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
    })
    .text("Вівторок", async (ctx) => {
        if (ctx.update.message?.from?.id != ctx.from.id) return ctx.answerCallbackQuery("❌ Ви не можете використовувати цю кнопку!");
        let s = show_schedule("Tuesday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
    })
    .text("Середа", async (ctx) => {
        if (ctx.update.message?.from?.id != ctx.from.id) return ctx.answerCallbackQuery("❌ Ви не можете використовувати цю кнопку!");
        let s = show_schedule("Wednesday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
    }).row()
    .text("Четвер", async (ctx) => {
        if (ctx.update.message?.from?.id != ctx.from.id) return ctx.answerCallbackQuery("❌ Ви не можете використовувати цю кнопку!");
        let s = show_schedule("Thursday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
    })
    .text("П'ятниця", async (ctx) => {
        if (ctx.update.message?.from?.id != ctx.from.id) return ctx.answerCallbackQuery("❌ Ви не можете використовувати цю кнопку!");
        let s = show_schedule("Friday");
        ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
    })
