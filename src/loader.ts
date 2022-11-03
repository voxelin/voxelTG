import { SchedulerBot } from "./classes/core";

const bot = new SchedulerBot(String(process.env.BOT_TOKEN));
bot.prepare();

bot.on("message", (ctx) => {
    try {
        const command = ctx.message
            .text!.replace(/@testchungabot/g, "")
            .replace(/@chungachanga_rebot/g, "")
            .replace("/", "");
        bot.sysHandlers.handleCommand(ctx, command);
    } catch (e) {
        return;
    }
});

setInterval(async () => {
    await bot.sysHandlers.handleTime(Number(process.env.GROUP_ID));
}, 1000 * 60);

bot.start();
