import {
  Box,
  Flex,
  List,
  Stack,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"
import {
  MdCalculate,
  MdHome,
  MdLockClock,
  MdMonetizationOn,
  MdOutlineCalculate,
  MdOutlineHome,
  MdOutlineMonetizationOn,
  MdOutlineSchedule,
  MdSchedule,
  MdWatchLater,
} from "react-icons/md"
import { ClassesController } from "../backend/controllers/classes"
import { TimezoneController } from "../backend/controllers/timezones"
import { Timezone, TimezoneImp } from "../backend/models/timezone"
import { AnimatedListItem } from "../components/animate-list-item"
import { Modal } from "../components/modal"
import { Profile } from "../components/profile"
import { SearchBox } from "../components/search-box"
import { Table } from "../components/table"
import { ToggleThemeButton } from "../components/toggle-theme-button"
import { removeAccent } from "../utils/remove-accent"

const classesController = new ClassesController()
const timezoneController = new TimezoneController()
const timezones = timezoneController.listAllTimezones()
const initialTimezone = new TimezoneImp("America/Sao_Paulo")

export default function () {
  const [timezone, setTimezone] = useState(initialTimezone)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const classes = classesController.findAllClassesInTimeZone(timezone.offset)
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
      <Box margin="auto" maxWidth="50rem" paddingY={{ md: "5rem" }}>
        <Flex
          paddingY="1rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Profile
            cursor="pointer"
            onClick={onOpen}
            country={timezone.country}
            title={timezone.city}
            text={timezone.offsetName}
          />
          <ToggleThemeButton />
        </Flex>
        <Table>
          <TableCaption>
            Horas em que começam a primeira e a última aula. (Horário de{" "}
            {timezone.city}, {timezone.country})
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Dias</Th>
              <Th>De</Th>
              <Th>Às</Th>
            </Tr>
          </Thead>
          <Tbody>
            {classes.map(
              ({ firstClassSchedule, lastClassSchedule, weekdays }) => (
                <Tr key={weekdays}>
                  <Td width="100%">{weekdays}</Td>
                  <Td>{firstClassSchedule}</Td>
                  <Td>{lastClassSchedule}</Td>
                </Tr>
              )
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Dias</Th>
              <Th>De</Th>
              <Th>Às</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <SearchBox
          onButtonClick={onClose}
          onInput={setQuery}
          placeholder="País, cidade ou fuso horário"
        />
        <List position="relative" overflowY="auto" height="100%">
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
      </Modal>
    </>
  )
}
