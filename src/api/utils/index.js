class TimeManager {
  static getCurrentWeekday() {
    const day = new Date().getDay();

    return day === 0 ? 7 : day;
  }

  static getWeekdayByString(str) {
    const WEEKDAY_VALUES = {
      'Понедельник': 1,
      'Вторник': 2,
      'Среда': 3,
      'Четверг': 4,
      'Пятница': 5,
      'Суббота': 6,
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
}

class ConstantsManager {
  static SHEDULE_REPLACMENTS_URL = "https://www.ttgdt.stu.ru/students/zam"
  static SHEDULE_HOME_URL = "https://www.ttgdt.stu.ru/students/raspisanie-zanyatij-ochnyh-otdelenij"
  static SHEDULE_GROUP_URL = "https://www.ttgdt.stu.ru/students/raspisanie-zanyatij"

  static REQUEST_USERAGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
}

export {
  TimeManager,
  ConstantsManager
}