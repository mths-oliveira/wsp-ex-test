import {
  ModalOverlay,
  Modal as ChakraModal,
  ModalContent,
  ModalProps,
  Box,
  Center,
  Flex,
} from "@chakra-ui/react"
import { useEffect, useRef } from "react"

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>()
  const animationDuration = 150
  useEffect(() => {
    const boxRef = modalRef.current.childNodes[0] as HTMLDivElement
    const input = document.getElementById("currency-input") as HTMLInputElement

    if (isOpen) {
      modalRef.current.style.display = "flex"
      setTimeout(() => {
        input.focus()
        boxRef.style.opacity = "1"
        boxRef.style.transform = "scale(1)"
      }, animationDuration)
    } else {
      boxRef.style.opacity = "0"
      boxRef.style.transform = "scale(0.9)"
      setTimeout(() => {
        modalRef.current.style.display = "none"
      }, animationDuration)
    }
  }, [isOpen])
  return (
    <Center
      bg="rgba(0,0,0,0.5)"
      position="fixed"
      inset="0"
      onClick={onClose}
      ref={modalRef}
      display="none"
    >
      <Flex
        flexDirection="column"
        transitionDuration={`${animationDuration}ms`}
        bg="primary"
        overflowY="auto"
        height={["100%", "calc(100% - 7rem)"]}
        maxWidth="25rem"
        borderRadius="5px"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </Flex>
    </Center>
  )
}
