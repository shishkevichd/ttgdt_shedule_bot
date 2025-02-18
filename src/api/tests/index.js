import { TimeManager } from "../utils/index.js";
import ReplacmentsManager from "../replacments.js";
import GroupManager from "../groups.js";
import Shedule from "../shedule.js";

/* 
  Получение списка групп
*/

// await GroupManager.fetchGroups()

/* 
  Поиск группы по запросу
*/

// console.log(await GroupManager.getGroupByString("531"))
// console.log(await GroupManager.getGroupByString("333"))
// console.log(await GroupManager.getGroupByString("241"))

/*
  Получение четности недели

  0 - нечетная неделя
  1 - четная неделя
*/

// console.log(TimeManager.getWeekParity())

/* 
  Получение расписания группы
*/

// const groupShedule = new Shedule(await GroupManager.getGroupByString("333"))

// console.log(JSON.stringify(await groupShedule.getShedule(), null, "\t"))

/* 
  Получения списка замен
*/

await ReplacmentsManager.fetchReplacments()

console.log(JSON.stringify({ replacments: await ReplacmentsManager.getReplacments() }, null, "\t"))