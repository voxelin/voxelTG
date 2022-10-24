import { Menu } from "@grammyjs/menu";
import { schedule } from "../data/schedule";

export const show_schedule = async (day: string) => {
    let message = "🗓️ *Графік на сьогодні*:\n";
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

export const schedule_days_menu = new Menu("schedule_days_menu")
    .text("Понеділок", async (ctx) => ctx.editMessageText(await show_schedule("Monday"), { parse_mode: "Markdown", disable_web_page_preview: true }))
    .text("Вівторок", async (ctx) => ctx.editMessageText(await show_schedule("Tuesday"), { parse_mode: "Markdown", disable_web_page_preview: true }))
    .text("Середа", async (ctx) => ctx.editMessageText(await show_schedule("Wednesday"), { parse_mode: "Markdown", disable_web_page_preview: true })).row()
    .text("Четвер", async (ctx) => ctx.editMessageText(await show_schedule("Thursday"), { parse_mode: "Markdown", disable_web_page_preview: true }))
    .text("П'ятниця", async (ctx) => ctx.editMessageText(await show_schedule("Friday"), { parse_mode: "Markdown", disable_web_page_preview: true }))