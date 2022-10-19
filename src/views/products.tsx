import {
  Box,
  Flex,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { currencyData } from "../backend/controllers/currency"
import { ProductsController } from "../backend/controllers/products"
import { Currency, CurrencyImp } from "../backend/models/currency"
import { Profile } from "../components/profile"
import { Table } from "../components/table"
import { ToggleThemeButton } from "../components/toggle-theme-button"

const productsController = new ProductsController()

interface Props {
  initialCurrency?: Currency
  currencyData: currencyData
  onOpen: () => void
}

const initialCurrency: Currency = {
  code: "BRL",
  symbol: "R$",
  value: 1,
}

export function ProductsView({ currencyData, onOpen }: Props) {
  const [currency, setCurrency] = useState(initialCurrency)
  const products = productsController.findAllValuesToCurrencyQuote(
    currency.value
  )
  useEffect(() => {
    CurrencyImp.getInstance(currencyData.code).then(setCurrency)
  }, [currencyData.code])
  return (
    <>
      <Flex paddingY="1rem" alignItems="center" justifyContent="space-between">
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
          Valores das Mensalidades e Taxa de Matrícula em ({currencyData.name})
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
    </>
  )
}
