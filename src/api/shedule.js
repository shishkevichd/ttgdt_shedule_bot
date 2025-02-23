import { TimeManager, ConstantsManager } from "./utils/index.js";
import { parse } from "node-html-parser"

class SheduleManager {
  constructor(groupNumber = "") {
    this.groupNumber = groupNumber
    this.shedule = this.fetchShedule()
  }

  async fetchShedule() {
    let formData = new FormData()
    formData.append("gr_no", this.groupNumber)

    const request = await fetch(
      ConstantsManager.SHEDULE_GROUP_URL,
      {
        cache: "no-cache",
        method: "POST",
        headers: {
          'User-Agent': ConstantsManager.REQUEST_USERAGENT
        },
        body: formData
      }
    )

    const data = await request.text()
    const parsedData = parse(data)

    let sheduleArray = []
    let selectedWeek = 0

    const tableBody = parsedData.querySelector("table")

    const addSubjectToDayShedule = (htmlElement) => {
      if (htmlElement.children.length === 5) {
        selectedWeek = TimeManager.getWeekdayByString(htmlElement.children[0].text) - 1

        sheduleArray.push({
          weekday: TimeManager.getWeekdayByString(htmlElement.children[0].text),
          lessons: [
            {
              lessonPosition: htmlElement.children[1].text,
              lessonName: htmlElement.children[2].text,
              lessonTeacher: htmlElement.children[3].text,
              lessonClassroom: htmlElement.children[4].text
            }
          ]
        })
      } else {
        if (
          htmlElement.children[1].text.length <= 0 &&
          htmlElement.children[2].text.length <= 0 &&
          htmlElement.children[3].text.length <= 0
        ) return

        sheduleArray[selectedWeek].lessons.push(
          {
            lessonPosition: htmlElement.children[0].text,
            lessonName: htmlElement.children[1].text,
            lessonTeacher: htmlElement.children[2].text,
            lessonClassroom: htmlElement.children[3].text
          }
        )
      }
    }

    tableBody
      .children
      .slice(1, tableBody.children.length)
      .forEach((lessonTr) => addSubjectToDayShedule(lessonTr))

    return sheduleArray
  }

  async getSheduleForWeek(withWeekParity = true) {
    let sheduleArray = await this.shedule

    const filterScheduleByWeekParity = () => {
      sheduleArray = sheduleArray.map((dayShedule) => {
        dayShedule.lessons = dayShedule.lessons
          .filter((lesson) => {
            const lessonPosition = `${lesson.lessonPosition}`

            return TimeManager.getWeekParity() === 0 ? !lessonPosition.includes("Н") : !lessonPosition.includes("Ч")
          })
          .map((lesson) => {
            const lessonPosition = `${lesson.lessonPosition}`

            lesson.lessonPosition = parseInt(lessonPosition.replace(/[ЧН]/, ""))

            return lesson
          })

        return dayShedule
      })
    }

    if (withWeekParity) filterScheduleByWeekParity()

    return sheduleArray
  }

  async getSheduleForDay(weekdayNumber = 1, withWeekParity = true) {
    const shedule = await this.getSheduleForWeek(withWeekParity)

    const selectedWeekday = shedule.filter((weekdayShedule) => {
      return weekdayShedule.weekday === weekdayNumber
    })

    return selectedWeekday[0]
  }
}

export default SheduleManager