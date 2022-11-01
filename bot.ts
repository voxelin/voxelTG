import { SchedulerBot, CommandHandler } from "./classes/core";

const bot = new SchedulerBot(String(process.env.BOT_TOKEN));
const handler = new CommandHandler(bot);

bot.prepare();

bot.on("message", (ctx) => {
    try {
        const command = ctx.message
            .text!.replace(/@testchungabot/g, "")
            .replace(/@chungachanga_rebot/g, "")
            .replace("/", "");
        handler.handle(ctx, command);
    } catch (e) {
        return;
    }
});

setInterval(async () => {
    await bot.setTimer(String(process.env.GROUP_ID));
}, 1000 * 60);

bot.start();
