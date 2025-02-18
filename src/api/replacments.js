import { ConstantsManager } from "./utils/index.js"
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

    const addReplacment = (htmlElement) => {
      if (
        htmlElement.children[0].text.length == 0 &&
        htmlElement.children[1].text.length == 0
      ) return

      if (htmlElement.children[0].text.length > 0) {
        selectedGroup += 1

        replacmentsArray.push({
          group: htmlElement.children[0].text,
          lessons: [
            {
              lessonPosition: htmlElement.children[1].text,
              replacedLesson: htmlElement.children[2].text,
              substitutedLesson: htmlElement.children[3].text,
              lessonClassroom: htmlElement.children[4].text
            }
          ]
        })
      }

      if (
        htmlElement.children[0].text.length <= 0 &&
        htmlElement.children[1].text.length > 0
      ) {
        replacmentsArray[selectedGroup].lessons.push(
          {
            lessonPosition: htmlElement.children[1].text,
            replacedLesson: htmlElement.children[2].text,
            substitutedLesson: htmlElement.children[3].text,
            lessonClassroom: htmlElement.children[4].text
          }
        )
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