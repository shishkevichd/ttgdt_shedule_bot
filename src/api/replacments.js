import { ConstantsManager, TimeManager } from "./utils/index.js"
import { parse } from "node-html-parser"

let replacmentsList = []

class ReplacmentsManager {
  static async fetchReplacments() {
    const request = await fetch(
      ConstantsManager.SHEDULE_REPLACMENTS_URL,
      {
        method: "GET",
        headers: {
          'User-Agent': ConstantsManager.REQUEST_USERAGENT
        }
      }
    )

    const data = await request.text()
    const parsedData = parse(data)

    const replacmentsOnNextDay = parsedData.querySelectorAll("table")[1]

    let replacmentsArray = []
    let selectedGroup = -1

    const formatReplacment = (
      elements,
      createNewGroupReplacment = false
    ) => {
      const getLessonPosition = () => {
        return TimeManager.parseLessonNumbers(elements[1].text)
      } 

      const getReplacedLesson = () => {
        return elements[2].text
      }

      const getSubstitutedLesson = () => {
        return elements[3].text
      }

      const getLessonClassroom = () => {
        return elements[4].text
      }

      const getGroup = () => {
        return elements[0].text
      }

      if (createNewGroupReplacment) {
        selectedGroup += 1

        replacmentsArray.push({
          group: getGroup(),
          lessons: [
            {
              lessonPosition: getLessonPosition(),
              replacedLesson: getReplacedLesson(),
              substitutedLesson: getSubstitutedLesson(),
              lessonClassroom: getLessonClassroom()
            }
          ]
        })
      } else {
        replacmentsArray[selectedGroup].lessons.push(
          {
            lessonPosition: getLessonPosition(),
            replacedLesson: getReplacedLesson(),
            substitutedLesson: getSubstitutedLesson(),
            lessonClassroom: getLessonClassroom()
          }
        )
      }
    } 

    const addReplacment = (htmlElement) => {
      if (
        htmlElement.children[0].text.length == 0 &&
        htmlElement.children[1].text.length == 0
      ) return

      if (htmlElement.children[0].text.length > 0) {
        formatReplacment(htmlElement.children, true)
      }

      if (
        htmlElement.children[0].text.length <= 0 &&
        htmlElement.children[1].text.length > 0
      ) {
        formatReplacment(htmlElement.children, false)
      }
    }

    replacmentsOnNextDay
      .children
      .slice(1, replacmentsOnNextDay.children.length)
      .forEach((replacmentTr) => {
        addReplacment(replacmentTr)
      })

    replacmentsList = replacmentsArray

    return true
  }

  static getReplacments() {
    return replacmentsList
  }
}

export default ReplacmentsManager