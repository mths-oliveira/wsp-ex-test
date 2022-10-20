import {
  ModalOverlay,
  Modal as ChakraModal,
  ModalContent,
  ModalProps,
} from "@chakra-ui/react"

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <ChakraModal
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
        {children}
      </ModalContent>
    </ChakraModal>
  )
}
