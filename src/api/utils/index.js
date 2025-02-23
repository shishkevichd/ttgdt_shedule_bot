class TimeManager {
  static getCurrentWeekday() {
    const day = new Date().getDay();

    return day === 0 ? 7 : day;
  }

  static getWeekdayByString(str, revert = false) {
    let WEEKDAY_VALUES = {
      'Понедельник': 1,
      'Вторник': 2,
      'Среда': 3,
      'Четверг': 4,
      'Пятница': 5,
      'Суббота': 6,
      'Воскресенье': 7
    }

    if (revert) {
      WEEKDAY_VALUES = {
        1: 'Понедельник',
        2: 'Вторник',
        3: 'Среда',
        4: 'Четверг',
        5: 'Пятница',
        6: 'Суббота',
        7: 'Воскресенье'
      }
    }

    return WEEKDAY_VALUES[str]
  }

  static getWeekParity() {
    const now = new Date();

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const daysDifference = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    const currentWeekNumber = Math.ceil((daysDifference + startOfYear.getDay() + 1) / 7);

    return currentWeekNumber % 2;
  }

  static parseLessonNumbers(inputStr) {
    const timePattern = /^\d{1,2}\.\d{2}$/;
    
    if (timePattern.test(inputStr)) {
      return [inputStr]; 
    }
    
    const numbers = inputStr.split(/[,.]/);
    
    return numbers.map(num => parseInt(num, 10));
  }
}

class ConstantsManager {
  static TELEGRAM_BOT_TOKEN = process.env.ENV_TG_TOKEN || ""
  static TELEGRAM_BOT_ADMIN_ID = process.env.ENV_TG_ADMINID || 0

  static SHEDULE_REPLACMENTS_URL = "https://www.ttgdt.stu.ru/students/zam"
  static SHEDULE_HOME_URL = "https://www.ttgdt.stu.ru/students/raspisanie-zanyatij-ochnyh-otdelenij"
  static SHEDULE_GROUP_URL = "https://www.ttgdt.stu.ru/students/raspisanie-zanyatij"

  static REQUEST_USERAGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
}

export {
  TimeManager,
  ConstantsManager
}