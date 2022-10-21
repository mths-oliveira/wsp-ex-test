import { Box, ChakraProvider, Flex } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { AppProps } from "next/app"
import Link from "next/link"
import {
  MdCalculate,
  MdMonetizationOn,
  MdOutlineCalculate,
  MdOutlineMonetizationOn,
  MdSchedule,
  MdWatchLater,
} from "react-icons/md"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Flex
        position="fixed"
        bottom="0"
        left="0"
        paddingY="1rem"
        width="100%"
        bg="primary"
        justifyContent="center"
        zIndex={5}
      >
        <Flex
          bg="secondary"
          fontSize="1.5rem"
          borderRadius="full"
          paddingX="0.25rem"
          sx={{
            "&>div": {
              padding: "0.75rem",
            },
          }}
        >
          <Link href="/">
            <Box>{true ? <MdWatchLater /> : <MdSchedule />}</Box>
          </Link>
          <Link href="/products">
            <Box>
              {true ? <MdMonetizationOn /> : <MdOutlineMonetizationOn />}
            </Box>
          </Link>
          <Box>{true ? <MdCalculate /> : <MdOutlineCalculate />}</Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}
