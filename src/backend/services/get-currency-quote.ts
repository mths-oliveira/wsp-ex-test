import { api } from "../../config/api"

export async function getCurrencyQuoteByCode(code: string) {
  if (code == "BRL") return 1
  const isDollarQuote = code === "USD"
  let url = "https://economia.awesomeapi.com.br/json/last/USD-BRL"
  if (!isDollarQuote) url += `,USD-${code}`
  const response = await api.get(url)
  const dollarPurchaseValue = Number(response.data["USDBRL"].bid)
  if (isDollarQuote) return dollarPurchaseValue
  const currencySaleValue = Number(response.data[`USD${code}`].ask)
  const currencyQuote = dollarPurchaseValue / currencySaleValue
  return currencyQuote
}
