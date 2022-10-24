import { Menu } from "@grammyjs/menu";
import { schedule } from "../data/schedule";
import markdownToTxt from 'markdown-to-txt';

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
    return message;
}

export const schedule_days_menu = new Menu("schedule_days_menu", { onMenuOutdated: "Updated, try now.", autoAnswer: false })
    .text("Понеділок", (ctx) => {
        let s = show_schedule("Monday");
        if (markdownToTxt(s) == ctx.update.callback_query.message?.text) {
            return ctx.answerCallbackQuery("Вже відкрито!");
        } else {
            ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
        }
    })
    .text("Вівторок", async (ctx) => {
        let s = show_schedule("Tuesday");
        if (markdownToTxt(s) == ctx.update.callback_query.message?.text) {
            return ctx.answerCallbackQuery("Вже відкрито!");
        } else {
            ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
        }
    })
    .text("Середа", async (ctx) => {
        let s = show_schedule("Wednesday");
        if (markdownToTxt(s) == ctx.update.callback_query.message?.text) {
            return ctx.answerCallbackQuery("Вже відкрито!");
        } else {
            ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
        }
    }).row()
    .text("Четвер", async (ctx) => {
        let s = show_schedule("Thursday");
        if (markdownToTxt(s) == ctx.update.callback_query.message?.text) {
            return ctx.answerCallbackQuery("Вже відкрито!");
        } else {
            ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
        }
    })
    .text("П'ятниця", async (ctx) => {
        let s = show_schedule("Friday");
        if (markdownToTxt(s) == ctx.update.callback_query.message?.text) {
            return ctx.answerCallbackQuery("Вже відкрито!");
        } else {
            ctx.editMessageText(s, { parse_mode: "Markdown", disable_web_page_preview: true })
        }
    })

