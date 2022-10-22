import { useColorMode } from "@chakra-ui/react"
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"

import { IconButton } from "./icon-button"

export function ToggleThemeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <IconButton
      bg="secondary"
      fontSize="1rem"
      icon={colorMode === "light" ? MdDarkMode : MdOutlineLightMode}
      marginX="1rem"
      borderRadius="6px"
      onClick={toggleColorMode}
    />
  )
}
