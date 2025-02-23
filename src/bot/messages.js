import { TimeManager } from "../api/utils/index.js";

class SheduleMessagesManager {
  static getWeekSheduleMessage(groupNumber, weekShedule) {
    let message = `👨‍🎓 ${groupNumber}\n\n`

    weekShedule.forEach((weekday, index) => {
      message += `📅 ${TimeManager.getWeekdayByString(weekday.weekday, true)}\n`
      
      weekday.lessons.forEach((lesson) => {
        message += `💠 ${lesson.lessonPosition.match(/[ЧН]/) ? `${lesson.lessonPosition}. ` : ``}${lesson.lessonName} — ${lesson.lessonClassroom ? `🚪${lesson.lessonClassroom}` : ''} ${lesson.lessonTeacher ? `👨‍🏫${lesson.lessonTeacher}` : ''}\n`
      })
    });

    return message
  }
}

export default SheduleMessagesManager