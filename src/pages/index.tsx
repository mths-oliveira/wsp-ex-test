import { Modal, ModalOverlay, ModalContent, Box, Flex } from "@chakra-ui/react"

import { useState } from "react"
import { TimezonesView } from "../views/timezone"
import { ClassesView } from "../views/classes"
import { TimezoneImp } from "../backend/models/timezone"
import { ProductsView } from "../views/products"
import { CurrencyController } from "../backend/controllers/currency"
import { CurrencyView } from "../views/currency"

const currencyController = new CurrencyController()
const initialCurrencyData = currencyController.fetchCurrencyDataByCode("BRL")
const initialTimezone = new TimezoneImp("America/Sao_Paulo")

export default function () {
  const [timezone, setTimezone] = useState(initialTimezone)
  const [currencyData, setCurrencyData] = useState(initialCurrencyData)
  const [view, setView] = useState<"timezones" | "currencies" | undefined>()
  const isOpen = !!view
  function onClose() {
    setView(undefined)
  }
  function openTimezoneModal() {
    setView("timezones")
  }
  function openCurrencyModal() {
    setView("currencies")
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          bg="transparent"
          minHeight="0"
          maxHeight="100vh"
          maxW="25rem"
          overflow="hidden"
          borderRadius="6px"
          margin={["0", "3.5rem"]}
          height={["100%", "calc(100% - 7rem)"]}
        >
          {view === "timezones" ? (
            <TimezonesView setTimezone={setTimezone} onClose={onClose} />
          ) : (
            <CurrencyView setCurrency={setCurrencyData} onClose={onClose} />
          )}
        </ModalContent>
      </Modal>
      <Flex overflowX="auto" sx={{ scrollSnapType: "x mandatory" }}>
        <Box
          padding={{ md: "5rem 12.5rem" }}
          flexShrink="0"
          width="100vw"
          sx={{ scrollSnapAlign: "start" }}
        >
          <ClassesView timezone={timezone} onOpen={openTimezoneModal} />
        </Box>
        <Box
          padding={{ md: "5rem 12.5rem" }}
          flexShrink="0"
          width="100vw"
          sx={{ scrollSnapAlign: "start" }}
        >
          <ProductsView
            currencyData={currencyData}
            onOpen={openCurrencyModal}
          />
        </Box>
      </Flex>
    </>
  )
}
