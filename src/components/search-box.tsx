import { Flex } from "@chakra-ui/react"
import { useEffect } from "react"
import { MdArrowBack } from "react-icons/md"
import { debounce } from "../utils/debounce"
import { IconButton } from "./icon-button"
import { IconInput } from "./icon-input"

interface Props {
  onButtonClick: () => void
  onInput: (value: string) => void
}

export function SearchBox({ onButtonClick, onInput }: Props) {
  useEffect(() => {
    const input = document.getElementById("currency-input") as HTMLInputElement
    input.focus()
  }, [])
  return (
    <Flex padding="1.5rem 1rem" bg="primary">
      <IconButton icon={MdArrowBack} marginX="0.5rem" onClick={onButtonClick} />
      <IconInput
        id="currency-input"
        onChange={debounce((e) => {
          onInput(e.target.value)
        })}
      />
    </Flex>
  )
}
