import { PATH } from "@/path"
import { ScrollArea, NavLink, Divider } from "@mantine/core"
import {
  IconBook,
  IconCylinder,
  IconGhost,
  IconPick,
} from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

interface ISidebarGroupItem {
  label: string
  href: string
  leftSection?: React.ReactNode
  permissions?: string
  children?: {
    label: string
    href: string
    leftSection?: React.ReactNode
    rightSection?: React.ReactNode
  }[]
}

const SIDEBAR_CONFIG: ISidebarGroupItem[] = [
  {
    label: "TOPICS",
    href: "#",
    leftSection: React.cloneElement(<IconPick />, { size: 36 }),
    children: [
      {
        label: "Horror",
        leftSection: React.cloneElement(<IconGhost />, { size: 24 }),
        href: PATH.HOME,
      },
    ],
  },
  {
    label: "RESOURCES",
    href: "#",
    leftSection: React.cloneElement(<IconCylinder />, { size: 36 }),
    children: [
      {
        label: "Blogs",
        leftSection: <IconBook size='1rem' stroke={1.5} />,
        href: PATH.HOME,
      },
    ],
  },
  {
    label: "COMMUNITIES",
    href: "#",
  },
]

function Sidebar() {
  const pathname = usePathname()

  return (
    <ScrollArea w='100%'>
      {SIDEBAR_CONFIG.map((groupItem, groupIdx) => {
        return groupItem.children ? (
          <NavLink
            key={`group-item-${groupIdx}`}
            href={groupItem.href}
            label={groupItem.label}
            leftSection={groupItem?.leftSection || null}
            childrenOffset={0}
            variant='filled'
            defaultOpened
          >
            {groupItem.children.map((item, itemIdx) => (
              <NavLink
                key={`sidebar-item-${groupIdx}-${itemIdx}`}
                label={item.label}
                href={item.href}
                variant='subtle'
                component={Link}
                rightSection={item?.rightSection || null}
                leftSection={item?.leftSection || null}
                active={pathname.startsWith(item.href)}
                styles={{
                  label: {
                    marginLeft: "0px",
                  },
                }}
              />
            ))}
            <Divider />
          </NavLink>
        ) : (
          <NavLink
            key={`group-item-${groupIdx}`}
            href={groupItem.href}
            label={groupItem.label}
            leftSection={groupItem?.leftSection || null}
            variant='filled'
          />
        )
      })}
    </ScrollArea>
  )
}

export default Sidebar
