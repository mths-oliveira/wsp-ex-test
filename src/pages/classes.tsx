import {
  Box,
  Flex,
  FlexProps,
  Heading,
  List,
  ListItem,
  ListItemProps,
  Stack,
  StackProps,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react"
import { ProfilerProps, useState } from "react"
import {
  MdChangeCircle,
  MdDarkMode,
  MdLightMode,
  MdOutlineCalculate,
  MdOutlineChangeCircle,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineMonetizationOn,
  MdOutlineSchedule,
} from "react-icons/md"
import { ClassesController } from "../backend/controllers/classes"
import { TimezoneController } from "../backend/controllers/timezones"
import { Timezone, TimezoneImp } from "../backend/models/timezone"
import { AnimatedListItem } from "../components/animate-list-item"
import { FlagImage } from "../components/flag-image"
import { Modal } from "../components/modal"
import { ProfileListItem } from "../components/profile-list-item"
import { SearchBox } from "../components/search-box"
import { Table } from "../components/table"
import { removeAccent } from "../utils/remove-accent"

const classesController = new ClassesController()
const timezoneController = new TimezoneController()
const timezones = timezoneController.listAllTimezones()
const initialTimezone = new TimezoneImp("America/Sao_Paulo")

function MenuItem({ children, as = "li", ...rest }: StackProps) {
  return (
    <Stack as={as} {...rest}>
      {children}
    </Stack>
  )
}

interface NavbarProps extends FlexProps {}

function Navbar({ flexDir, ...rest }: NavbarProps) {
  return (
    <Flex as="nav" {...rest}>
      <List
        width="100%"
        display="flex"
        flexDir={flexDir}
        sx={{
          "&>li": {
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: ["1rem", "1rem 1.5rem"],
            cursor: "pointer",
            _hover: {
              bg: "secondary",
            },
            "&>p": {
              marginLeft: "1rem",
              display: ["none", "inline"],
            },
          },
        }}
      >
        <ListItem>
          <MdOutlineSchedule />
          <Text>Tabela de Horários</Text>
        </ListItem>
        <ListItem>
          <MdOutlineMonetizationOn />
          <Text>Tabela de Preços</Text>
        </ListItem>
        <ListItem>
          <MdOutlineCalculate />
          <Text>Calcular pacote</Text>
        </ListItem>
      </List>
    </Flex>
  )
}

interface ProfileProps extends FlexProps {
  country: string
  title: string
  text: string
}

function Profile({ title, text, country, ...rest }: ProfileProps) {
  return (
    <Flex
      alignItems="center"
      cursor="pointer"
      fontWeight="600"
      flexDir={{ md: "column" }}
      margin={["1rem 0", "3.5rem 1rem"]}
      {...rest}
    >
      <Box position="relative" margin="0.25rem">
        <FlagImage country={country} width={["4rem", "5rem"]} />
        <Tooltip
          label="Trocar de fuso horário"
          bg="text"
          padding="0.25rem 0.5rem"
          openDelay={500}
          hasArrow
        >
          <Box
            position="absolute"
            bottom={["0.25rem", "0.5rem"]}
            right="0.5rem"
            bg="primary"
            color="text"
            padding="2px"
            borderRadius="full"
          >
            <MdOutlineChangeCircle />
          </Box>
        </Tooltip>
      </Box>
      <Box textAlign={{ md: "center" }}>
        <Text>{title}</Text>
        <Text fontSize="14px" color="altText">
          {text}
        </Text>
      </Box>
    </Flex>
  )
}

export default function () {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const [timezone, setTimezone] = useState(initialTimezone)
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
      <Flex>
        <Flex
          display={["none", "flex"]}
          as="aside"
          flexDir="column"
          height="100vh"
          width="15rem"
          flexShrink="0"
          borderRight="sm"
          borderColor="borderColor"
          position="relative"
        >
          <Profile
            country={timezone.country}
            title={timezone.city}
            text={timezone.offsetName}
            onClick={onOpen}
          />
          <Navbar flexDir="column" />
        </Flex>
        <Flex flexDir="column" width="100%" position="relative">
          <Profile
            display={["flex", "none"]}
            country={timezone.country}
            title={timezone.city}
            text={timezone.offsetName}
            onClick={onOpen}
          />
          <Box padding={{ md: "5rem" }} width="100%" maxWidth="60rem">
            <Heading
              fontSize={["1.25rem", "1.5rem"]}
              margin={["1.5rem 1rem 1rem", "0 0 1.5rem"]}
            >
              Tabela de Horários
            </Heading>
            <Box
              border="sm"
              borderRadius="md"
              borderColor={["transparent", "borderColor"]}
              padding={{ md: "1rem" }}
              height="fit-content"
            >
              <Table>
                <TableCaption marginBottom={["3.5rem", "0"]}>
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
          </Box>
          <Flex
            bottom="0"
            position="fixed"
            justifyContent="center"
            width="100%"
            bg="primary"
            display={["flex", "none"]}
          >
            <Navbar flexDir="row" />
          </Flex>
        </Flex>
      </Flex>
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
              <ProfileListItem
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
