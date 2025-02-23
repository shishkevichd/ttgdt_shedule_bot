import ReplacmentsManager from "./replacments.js";
import { TimeManager, ConstantsManager } from "./utils/index.js";
import { parse } from "node-html-parser"

class Shedule {
  constructor(groupNumber = "") {
    this.groupNumber = groupNumber
  }

  async getSheduleForWeek(
    withReplacments = false,
    withWeekParitied = true
  ) {
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
          group: this.groupNumber,
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

    const filterScheduleByWeekParity = () => {
      sheduleArray = sheduleArray.map((dayShedule) => {
        dayShedule.lessons = dayShedule.lessons
          .filter((lesson) => TimeManager.getWeekParity() === 0 ? !lesson.lessonPosition.includes("Н") : !lesson.lessonPosition.includes("Ч"))
          .map((lesson) => {
            lesson.lessonPosition = parseInt(lesson.lessonPosition.replace(/[ЧН]/, ""))

            return lesson
          })

        return dayShedule
      })
    }

    const addReplacmentsToExistedShedule = () => {
      const groupReplacments = ReplacmentsManager
        .getReplacments()
        .filter((groupReplacment) => groupReplacment.group === this.groupNumber)

      const shedule = sheduleArray
    }

    tableBody
      .children
      .slice(1, tableBody.children.length)
      .forEach((lessonTr) => addSubjectToDayShedule(lessonTr))

    if (withWeekParitied) filterScheduleByWeekParity()

    if (withWeekParitied && withReplacments) addReplacmentsToExistedShedule()

    return sheduleArray
  }


}

export default Shedule