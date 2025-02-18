import GroupManager from "./groups.js";
import Shedule from "./shedule.js";
import TimeManager from "./utils.js";

/* 
  Получение списка групп
*/

const groups = await GroupManager.getAllGroups()
const shedule = new Shedule(await GroupManager.getGroupByString(groups, "331"))

console.log(groups)

/* 
  Поиск группы по запросу
*/

console.log(await GroupManager.getGroupByString(groups, "531"))
console.log(await GroupManager.getGroupByString(groups, "333"))
console.log(await GroupManager.getGroupByString(groups, "241"))

// => 211,222
// чево))
console.log(await GroupManager.getGroupByString(groups, "2"))

/*
  Получение четности недели

  0 - нечетная неделя
  1 - четная неделя
*/

console.log(TimeManager.getWeekParity())

/* 
  Получение расписания группы (без замен/с заменами)
*/

const groupShedule = await shedule.getShedule()

console.log(JSON.stringify(groupShedule, null, "\t"))