import { ConstantsManager, TimeManager } from "../api/utils/index.js"

import TelegramBot from "node-telegram-bot-api";
import Utils from "./utils.js";
import SheduleMessagesManager from "./messages.js";
import Shedule from "../api/shedule.js";
import GroupManager from "../api/groups.js"

const bot = new TelegramBot(
  ConstantsManager.TELEGRAM_BOT_TOKEN,
  {
    polling: true
  }
);

const isGroupFetched = await GroupManager.fetchGroups()

bot.on('inline_query', async (query) => {
  if (isGroupFetched) {
    const results = [];

    if (query.query) {
      const group = await GroupManager.getGroupByString(query.query)

      const reply_markup = {
        inline_keyboard: [
          [
            {
              text: "🧑‍💻 Автор бота",
              url: "https://t.me/shishkevichd"
            }
          ]
        ]
      }

      if (!group.found) {
        results.push({
          type: 'article',
          id: Utils.generateRandomNumber(),
          title: 'Не найдено',
          description: 'Введите первый номер группы и мы найдем его.',
          reply_markup: reply_markup,
          thumbnail_url: Utils.getInlineImage("search"),
          thumbnail_width: 32,
          thumbnail_height: 32,
          input_message_content: {
            message_text: `⛔ Не найдено\n\nВведите первый номер группы и мы найдем его.`,
          },
        });
      } else {
        const shedule = new Shedule(group.name)

        results.push({
          type: 'article',
          id: Utils.generateRandomNumber(),
          title: `Найденные данные`,
          description: `Группа: ${group.name}\nУчебная неделя: ${TimeManager.getWeekParity() == 0 ? "нечетная" : "четная"}`,
          thumbnail_url: Utils.getInlineImage("group"),
          thumbnail_width: 32,
          thumbnail_height: 32,
          reply_markup: reply_markup,
          input_message_content: {
            message_text: group.name,
          },
        });

        results.push({
          type: 'article',
          id: Utils.generateRandomNumber(),
          title: 'Получить расписание (с заменами)',
          description: 'на Понедельник [21.02].',
          thumbnail_url: Utils.getInlineImage("today"),
          thumbnail_width: 32,
          thumbnail_height: 32,
          reply_markup: reply_markup,
          input_message_content: {
            message_text: group.name,
          },
        });

        results.push({
          type: 'article',
          id: Utils.generateRandomNumber(),
          title: 'Получить расписание (без замен)',
          description: 'на Понедельник [21.02].',
          thumbnail_url: Utils.getInlineImage("today"),
          thumbnail_width: 32,
          thumbnail_height: 32,
          reply_markup: reply_markup,
          input_message_content: {
            message_text: group.name,
          },
        });

        const weekShedule = await shedule.getSheduleForWeek(false)

        results.push({
          type: 'article',
          id: Utils.generateRandomNumber(),
          title: 'Получить расписание (без замен)',
          description: `на всю неделю`,
          thumbnail_url: Utils.getInlineImage("weekday"),
          thumbnail_width: 32,
          thumbnail_height: 32,
          reply_markup: reply_markup,
          input_message_content: {
            message_text: SheduleMessagesManager.getWeekSheduleMessage(group.name, weekShedule),
          },
        });
      }
    }

    try {
      return await bot.answerInlineQuery(query.id, results);
    } catch (error) {
      console.error(`❌ [${error.name}] ${error.message}`)
    }
  }
});

bot.onText('/start', async (msg) => {
  await bot.sendMessage(
    msg.chat.id,
    `👋 Добрый!\n\nℹ️ У бота нет команд, но вы его можете использовать везде (в ЛС, каналах, группах).`,
    {
      reply_to_message_id: msg.message_id,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "💭 Попробовать",
              switch_inline_query_current_chat: ""
            }
          ]
        ]
      }
    }
  );
});