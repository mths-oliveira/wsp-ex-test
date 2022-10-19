import timezonesData from "../database/timezones.json"
import { Timezone, TimezoneImp } from "../models/timezone"

export class TimezoneController {
  listAllTimezones(): Timezone[] {
    const timezones = Object.keys(timezonesData).map((timezoneId) => {
      const timezone = new TimezoneImp(timezoneId)
      return timezone
    })
    return timezones
  }
}
