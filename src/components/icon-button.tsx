import {
  Center,
  CenterProps,
  Icon,
  ComponentWithAs,
  IconProps,
} from "@chakra-ui/react"
import { IconType } from "react-icons/"

interface IconButtonProps extends CenterProps {
  icon: IconType | ComponentWithAs<"svg", IconProps>
}

export function IconButton({ icon, ...rest }: IconButtonProps) {
  return (
    <Center as="button" width="48px" height="48px" fontSize="1.5rem" {...rest}>
      <Icon as={icon} />
    </Center>
  )
}
