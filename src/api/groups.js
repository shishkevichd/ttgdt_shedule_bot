import { parse } from "node-html-parser"
import { ConstantsManager } from "./utils/index.js"

import Fuse from "fuse.js"

let groupList = []

const GroupManager = {
  fetchGroups: async () => {
    const request = await fetch(
      ConstantsManager.SHEDULE_HOME_URL,
      {
        method: "GET",
        headers: {
          'User-Agent': ConstantsManager.REQUEST_USERAGENT
        }
      }
    )

    const data = await request.text()
    const parsedData = parse(data)

    const groupArray = parsedData.getElementById("gr_no").children.map((groupOption) => groupOption.text)

    groupList = groupArray.slice(1, groupArray.length)

    return true
  },

  getGroupByString: async (targetGroup) => {
    if (groupList.length <= 0) return undefined

    const fuse = new Fuse(groupList)

    return fuse.search(targetGroup)[0].item;
  }
}

export default GroupManager