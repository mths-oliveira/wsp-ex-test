import currenciesData from "../database/currencies.json"
import { getCurrencyQuoteByCode } from "../services/get-currency-quote"

export interface Currency {
  code: string
  symbol: string
  value: number
}

export class CurrencyImp {
  private constructor() {}
  static async getInstance(code): Promise<Currency> {
    const { symbol } = currenciesData[code]
    const value = await getCurrencyQuoteByCode(code)
    return {
      code,
      symbol,
      value,
    }
  }
}
