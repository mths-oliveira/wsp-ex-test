import { Box, List } from "@chakra-ui/layout"
import { useState } from "react"
import { removeAccent } from "../utils/remove-accent"
import { SearchBox } from "../components/search-box"
import { AnimatedListItem } from "../components/animate-list-item"
import { Profile } from "../components/profile"
import { TimezoneController } from "../backend/controllers/timezones"
import { Timezone } from "../backend/models/timezone"

const timezoneController = new TimezoneController()
const timezones = timezoneController.listAllTimezones()

interface Props {
  setTimezone: (timezone: Timezone) => void
  onClose: () => void
}

export function TimezonesView({ setTimezone, onClose }: Props) {
  const [query, setQuery] = useState("")
  const regexp = RegExp(removeAccent(query), "i")
  function filter(timezone: Timezone) {
    if (query.match(/^GMT?$/i)) return true
    if (query.match(/[\d+:-]/)) {
      return Boolean(timezone.offsetName.includes(query.toUpperCase()))
    }
    return Boolean(
      regexp.exec(removeAccent(timezone.city)) ||
        regexp.exec(removeAccent(timezone.country))
    )
  }
  return (
    <>
      <SearchBox onButtonClick={onClose} onInput={setQuery} />
      <List position="relative" overflowY="auto" height="100%" bg="primary">
        {timezones.filter(filter).map((timezone, i) => (
          <AnimatedListItem
            key={timezone.city}
            index={i}
            onClick={() => {
              setTimezone(timezone)
              onClose()
            }}
          >
            <Profile
              country={timezone.country}
              title={timezone.city}
              text={timezone.offsetName}
            />
          </AnimatedListItem>
        ))}
      </List>
    </>
  )
}
