import SheduleManager from "../shedule.js";
import GroupManager from "../groups.js";

await GroupManager.fetchGroups()

const selectedGroup = await GroupManager.getGroupByString("331")

const groupShedule = new SheduleManager(selectedGroup.name)

const week = await groupShedule.getSheduleForDay(3)

console.log(week)