import data from "../database/classes.json"

interface Classes {
  weekdays: string
  firstClassSchedule: string
  lastClassSchedule: string
}

export class ClassesController {
  findAllClassesInTimeZone(offset: number): Classes[] {
    return data.classes.map((classes) => {
      const firstClassSchedule = convertTimeByOffset(
        classes.firstClassSchedule,
        offset
      )
      const lastClassSchedule = convertTimeByOffset(
        classes.lastClassSchedule,
        offset
      )
      return {
        firstClassSchedule,
        lastClassSchedule,
        weekdays: classes.weekdays,
      }
    })
  }
}

const date = new Date()
const brasiliaTimeOffset = -3 * 60
function convertTimeByOffset(time: string, offset: number) {
  const [hoursStr, minutesStr] = time.split(":")
  date.setHours(Number(hoursStr))
  date.setMinutes(offset - brasiliaTimeOffset + Number(minutesStr))
  const timeConverted = date.toTimeString().substring(0, 5)
  return timeConverted
}
