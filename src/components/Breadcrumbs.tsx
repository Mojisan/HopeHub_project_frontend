import { Anchor, Box, Breadcrumbs as MantineBreadcrumbs } from "@mantine/core"
import Link from "next/link"

export const Breadcrumbs: React.FC<{
  items: {
    title: string
    href?: string
  }[]
}> = ({ items }) => {
  return (
    <MantineBreadcrumbs py='sm' separator='/'>
      {items.map((item, index) =>
        item.href ? (
          <Anchor href={item.href} key={index} component={Link}>
            {item.title}
          </Anchor>
        ) : (
          <Box key={index}>{item.title}</Box>
        )
      )}
    </MantineBreadcrumbs>
  )
}
