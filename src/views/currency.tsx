import {
  CurrencyController,
  currencyData,
} from "../backend/controllers/currency"
import { Box, List } from "@chakra-ui/layout"
import { useState } from "react"
import { removeAccent } from "../utils/remove-accent"
import { SearchBox } from "../components/search-box"
import { AnimatedListItem } from "../components/animate-list-item"
import { Profile } from "../components/profile"

const currencyController = new CurrencyController()
const currencies = currencyController.listAllCurrencies()

interface Props {
  setCurrency: (currency: currencyData) => void
  onClose: () => void
}

export function CurrencyView({ onClose, setCurrency }: Props) {
  const [query, setQuery] = useState("")
  const regexp = RegExp(removeAccent(query), "i")
  function filter(currency: currencyData) {
    return Boolean(
      regexp.exec(removeAccent(currency.name)) ||
        regexp.exec(removeAccent(currency.country)) ||
        regexp.exec(currency.code)
    )
  }
  return (
    <>
      <SearchBox onButtonClick={onClose} onInput={setQuery} />
      <List position="relative" overflowY="auto" height="100%" bg="primary">
        {currencies.filter(filter).map((currency, i) => (
          <AnimatedListItem
            key={currency.code}
            index={i}
            onClick={() => {
              setCurrency(currency)
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
    </>
  )
}
