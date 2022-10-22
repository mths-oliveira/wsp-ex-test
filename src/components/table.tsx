import { Table as ChakraTable, TableProps } from "@chakra-ui/react"

export function Table({ sx, children, ...props }: TableProps) {
  return (
    <ChakraTable
      variant="simple"
      sx={{
        "*>tr>th": {
          color: "altText",
        },
        "&>caption, *>tr>*": {
          padding: ["1rem", "1rem 1.5rem"],
        },
        "&>*>tr>*": {
          borderColor: "borderColor",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </ChakraTable>
  )
}
