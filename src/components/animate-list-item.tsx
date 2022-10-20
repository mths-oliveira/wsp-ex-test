import { ListItem, ListItemProps } from "@chakra-ui/react"

interface Props extends ListItemProps {
  index: number
}

export function AnimatedListItem(props: Props) {
  const top = props.index * 64
  return (
    <ListItem
      position="absolute"
      top={`${top}px`}
      opacity={0}
      transition="top 0.3s"
      animation="0.3s forwards slade-in"
      cursor="pointer"
      bg="primary"
      width="100%"
      _hover={{
        bg: "secondary",
      }}
      {...props}
    />
  )
}
