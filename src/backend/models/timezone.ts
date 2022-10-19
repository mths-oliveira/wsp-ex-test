import timezonesData from "../database/timezones.json"

export interface Timezone {
  country: string
  city: string
  offset: number
  offsetName: string
}

const date = new Date()
const utc = {
  hours: date.getUTCHours(),
  minutes: date.getUTCMinutes(),
  day: date.getUTCDate(),
}

export class TimezoneImp implements Timezone {
  public city: string
  public country: string
  public offset: number
  public offsetName: string
  constructor(timezone: string) {
    const { city, country } = timezonesData[timezone]
    const offset = TimezoneImp.findTimeZoneOffset(timezone)
    const offsetName = TimezoneImp.findTimezoneNameByOffset(offset)
    this.city = city
    this.country = country
    this.offset = offset
    this.offsetName = offsetName
  }
  private static findTimeZoneOffset(timeZone: string) {
    const [dayStr, timeStr] = date
      .toLocaleTimeString("pt-BR", {
        timeZone,
        day: "numeric",
      })
      .split(" ")
    const [hoursStr, minutesStr] = timeStr.split(":")
    const hours = Number(hoursStr)
    const minutes = Number(minutesStr)
    const day = Number(dayStr)
    let diffHours = hours - utc.hours
    if (utc.day > day) diffHours -= 24
    if (utc.day < day) diffHours += 24
    const diffMinutes = minutes - utc.minutes
    const offset = diffHours * 60 + diffMinutes
    return offset
  }
  private static findTimezoneNameByOffset(offset: number) {
    const offsetMinutes = offset % 60
    const offsetHours = (offset - offsetMinutes) / 60
    const formatedHours = offsetHours
      .toString()
      .replace(/(-?)(\d{1,2})/, (_, symbol, number) => {
        if (!symbol) symbol = "+"
        number = number.padStart(2, "0")
        return symbol + number
      })
    const formatedMinutes = Math.abs(offsetMinutes).toString().padStart(2, "0")
    return `GMT${formatedHours}:${formatedMinutes}`
  }
}
