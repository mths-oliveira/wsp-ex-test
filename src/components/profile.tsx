import { Box, Flex, FlexProps, Text } from "@chakra-ui/react"
import { FlagImage } from "./flag-image"

interface Props extends FlexProps {
  country: string
  title: string
  text: string
}

export function Profile({ country, text, title, ...props }: Props) {
  return (
    <Flex alignItems="center" {...props}>
      <FlagImage country={country} />
      <Box fontWeight="600">
        <Text>{title}</Text>
        <Text fontSize="14px" color="altText">
          {text}
        </Text>
      </Box>
    </Flex>
  )
}
