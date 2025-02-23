import { ConstantsManager, TimeManager } from "../api/utils/index.js"
import GroupManager from "../api/groups.js"

import TelegramBot from "node-telegram-bot-api";

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

      if (!group.found) {
        results.push({
          type: 'article',
          id: 1,
          title: 'Не найдено',
          description: 'Введите первый номер группы и мы найдем его.',
          input_message_content: {
            message_text: `⛔ Не найдено\n\nВведите первый номер группы и мы найдем его.\n\n@ttgdtbot`,
          },
        });
      } else {
        results.push({
          type: 'article',
          id: 1,
          title: '🧑‍🤝‍🧑 Ваша группа',
          description: group.name,
          input_message_content: {
            message_text: group.name,
          },
        });
        
        results.push({
          type: 'article',
          id: 2,
          title: '📅 Получить расписание',
          description: 'на Понедельник [21.02]',
          input_message_content: {
            message_text: group.name,
          },
        });
        
        const weekdaysNumber = [1,2,3,4,5,6]

        weekdaysNumber.forEach((weekdayNumber) => {
          results.push({
            type: 'article',
            id: weekdayNumber + 30,
            title: '🗓️ Получить расписание (без замен)',
            description: `на ${TimeManager.getWeekdayByString(weekdayNumber, true)}`,
            input_message_content: {
              message_text: group.name,
            },
          });
        })
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