import { currencyMask } from "../../utils/currency-mask"
import productsData from "../database/products.json"

interface ProductPayment {
  name: string
  payment: string
  value: string
}

export class ProductsController {
  findAllValuesToCurrencyQuote(currencyValue: number): ProductPayment[] {
    return [
      {
        name: "Wol",
        payment: "Mensalidade",
        value: currencyMask(productsData.wol.monthlyPayment / currencyValue),
      },
      {
        name: "Mult Wol",
        payment: "Mensalidade",
        value: currencyMask(
          productsData.multWol.monthlyPayment / currencyValue
        ),
      },
      {
        name: "Live",
        payment: "Matrícula",
        value: currencyMask(productsData.live.enrolmentFee / currencyValue),
      },
      {
        name: "Live",
        payment: "Mensalidade",
        value: currencyMask(productsData.live.monthlyPayment / currencyValue),
      },
      {
        name: "Mult Live",
        payment: "Matrícula",
        value: currencyMask(productsData.multLive.enrolmentFee / currencyValue),
      },
      {
        name: "Mult Live",
        payment: "Mensalidade",
        value: currencyMask(
          productsData.multLive.monthlyPayment / currencyValue
        ),
      },
    ]
  }
}
