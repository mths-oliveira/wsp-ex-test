import {
  Flex,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {
  CurrencyController,
  currencyData,
} from "../backend/controllers/currency"
import { ProductsController } from "../backend/controllers/products"
import { Currency, CurrencyImp } from "../backend/models/currency"
import { Table } from "../components/table"
import { ToggleThemeButton } from "../components/toggle-theme-button"
import { Box, List } from "@chakra-ui/layout"
import { SearchBox } from "../components/search-box"
import { AnimatedListItem } from "../components/animate-list-item"
import { Profile } from "../components/profile"
import { Modal } from "../components/modal"
import { removeAccent } from "../utils/remove-accent"

const currencyController = new CurrencyController()
const currencies = currencyController.listAllCurrencies()
const productsController = new ProductsController()

const initialCurrency: Currency = {
  code: "BRL",
  symbol: "R$",
  value: 1,
}

const initialCurrencyData: currencyData = {
  code: "BRL",
  country: "Brasil",
  name: "Real Brasilerio",
}

export default function () {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [currencyData, setCurrencyData] = useState(initialCurrencyData)
  const [currency, setCurrency] = useState(initialCurrency)
  const products = productsController.findAllValuesToCurrencyQuote(
    currency.value
  )
  const [query, setQuery] = useState("")
  const regexp = RegExp(removeAccent(query), "i")
  function filter(currency: currencyData) {
    return Boolean(
      regexp.exec(removeAccent(currency.name)) ||
        regexp.exec(removeAccent(currency.country)) ||
        regexp.exec(currency.code)
    )
  }
  useEffect(() => {
    CurrencyImp.getInstance(currencyData.code).then(setCurrency)
  }, [currencyData.code])
  return (
    <>
      <Box padding={{ md: "5rem 12.5rem" }}>
        <Flex
          paddingY="1rem"
          alignItems="center"
          justifyContent="space-between"
        >
          <Profile
            cursor="pointer"
            onClick={onOpen}
            country={currencyData.country}
            title={currencyData.name}
            text={currencyData.code}
          />
          <ToggleThemeButton />
        </Flex>
        <Table>
          <TableCaption>
            Valores das Mensalidades e Taxa de Matrícula em ({currencyData.name}
            )
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Pagamento</Th>
              <Th>Produto</Th>
              <Th isNumeric>valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map(({ name, payment, value }) => (
              <Tr key={`${name}${payment}`} whiteSpace="nowrap">
                <Td>{payment}</Td>
                <Td width="100%">{name}</Td>
                <Td>
                  <Flex justifyContent="space-between" fontWeight="600">
                    <Text>{currency.symbol}</Text>
                    <Text marginLeft="0.25rem">{value}</Text>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Pagamento</Th>
              <Th>Produto</Th>
              <Th isNumeric>valor</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <SearchBox onButtonClick={onClose} onInput={setQuery} />
        <List position="relative" overflowY="auto" height="100%" bg="primary">
          {currencies.filter(filter).map((currency, i) => (
            <AnimatedListItem
              key={currency.code}
              index={i}
              onClick={() => {
                setCurrencyData(currency)
                onClose()
              }}
            >
              <Profile
                country={currency.country}
                title={currency.name}
                text={currency.code}
              />
            </AnimatedListItem>
          ))}
        </List>
      </Modal>
    </>
  )
}
