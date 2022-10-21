import { Flex } from "@chakra-ui/react"
import { MdArrowBack } from "react-icons/md"
import { debounce } from "../utils/debounce"
import { IconButton } from "./icon-button"
import { IconInput } from "./icon-input"

interface Props {
  onButtonClick: () => void
  onInput: (value: string) => void
  placeholder: string
}

export function SearchBox({ onButtonClick, onInput, placeholder }: Props) {
  return (
    <Flex padding="1.5rem 1rem">
      <IconButton icon={MdArrowBack} marginX="0.5rem" onClick={onButtonClick} />
      <IconInput
        id="currency-input"
        placeholder={placeholder}
        onChange={debounce((e) => {
          onInput(e.target.value)
        })}
      />
    </Flex>
  )
}
