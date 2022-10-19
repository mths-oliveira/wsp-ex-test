import {
  Box,
  Flex,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { ClassesController } from "../backend/controllers/classes"
import { Timezone } from "../backend/models/timezone"
import { Profile } from "../components/profile"
import { Table } from "../components/table"
import { ToggleThemeButton } from "../components/toggle-theme-button"

const classesController = new ClassesController()

interface Props {
  timezone: Timezone
  onOpen: () => void
}

export function ClassesView({ timezone, onOpen }: Props) {
  const classes = classesController.findAllClassesInTimeZone(timezone.offset)
  return (
    <>
      <Flex paddingY="1rem" alignItems="center" justifyContent="space-between">
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
    </>
  )
}
