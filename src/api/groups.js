import { parse } from "node-html-parser"
import { ConstantsManager } from "./utils"

import Fuse from "fuse.js"

const GroupManager = {
  getAllGroups: async () => {
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

    return groupArray.slice(1, groupArray.length)
  },

  getGroupByString: async (groupArray, targetGroup) => {
    const fuse = new Fuse(groupArray)

    return fuse.search(targetGroup)[0].item;
  }
}

export default GroupManager