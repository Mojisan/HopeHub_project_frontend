import { PATH } from "@/path"
import { useUserStore } from "@/stores/useUserStore"
import {
  Flex,
  Menu,
  ActionIcon,
  Avatar,
  Autocomplete,
  Box,
  Image,
} from "@mantine/core"
import {
  IconMessage,
  IconBell,
  IconSettings,
  IconUser,
  IconLogout,
  IconCategory,
  IconSearch,
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import React from "react"

const MENU_OPTIONS = [
  {
    id: 1,
    title: "Message",
    icon: <IconMessage size='lg' />,
    path: PATH.HOME,
  },
  {
    id: 2,
    title: "Notification",
    icon: <IconBell size='lg' />,
    path: PATH.HOME,
  },
  {
    id: 3,
    title: "Setting",
    icon: <IconSettings size='lg' />,
    path: PATH.HOME,
  },
]

const LOGIN_OPTIONS = [
  {
    id: 1,
    title: "Profile",
    icon: <IconUser size='lg' />,
    path: PATH.PROFILE,
  },
  {
    id: 2,
    title: "Setting",
    icon: <IconSettings size='lg' />,
    path: PATH.HOME,
  },
]

const BaseSizeMenu = () => {
  const { logout } = useUserStore()

  return (
    <Flex gap='lg' align='center'>
      <Menu
        trigger='hover'
        openDelay={100}
        closeDelay={400}
        transitionProps={{
          transition: "rotate-right",
          duration: 150,
        }}
        position='bottom-end'
        offset={2}
      >
        <Menu.Target>
          <ActionIcon variant='filled' aria-label='Menu' size='lg' bg='none'>
            <IconCategory size='lg' />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown w={200}>
          {MENU_OPTIONS.map((item) => (
            <Menu.Item
              key={item.id}
              leftSection={React.cloneElement(item.icon, { size: 24 })}
              component='a'
              href={item.path}
            >
              {item.title}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>

      <Menu shadow='md' width={200}>
        <Menu.Target>
          <Avatar
            src={null}
            alt='profile'
            radius='xl'
            size='lg'
            color='white'
          />
        </Menu.Target>

        <Menu.Dropdown>
          {LOGIN_OPTIONS.map((item) => (
            <Menu.Item
              key={item.id}
              leftSection={React.cloneElement(item.icon, { size: 24 })}
              component='a'
              href={item.path}
            >
              {item.title}
            </Menu.Item>
          ))}
          <Menu.Item
            leftSection={React.cloneElement(<IconLogout size='lg' />, {
              size: 24,
            })}
            component='a'
            onClick={logout}
            href={PATH.LOGIN}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  )
}

const PcSizeMenu = () => {
  const { logout } = useUserStore()

  return (
    <Flex gap='lg' align='center'>
      {MENU_OPTIONS.map((item) => (
        <ActionIcon
          key={item.id}
          variant='filled'
          aria-label={item.title}
          size='lg'
          component='a'
          href={item.path}
          bg='none'
        >
          {item.icon}
        </ActionIcon>
      ))}

      <Menu shadow='md' width={200}>
        <Menu.Target>
          <Avatar
            src={null}
            alt='profile'
            radius='xl'
            size='lg'
            color='white'
          />
        </Menu.Target>

        <Menu.Dropdown>
          {LOGIN_OPTIONS.map((item) => (
            <Menu.Item
              key={item.id}
              leftSection={React.cloneElement(item.icon, { size: 24 })}
              component='a'
              href={item.path}
            >
              {item.title}
            </Menu.Item>
          ))}
          <Menu.Item
            leftSection={React.cloneElement(<IconLogout size='lg' />, {
              size: 24,
            })}
            component='a'
            onClick={logout}
            href={PATH.LOGIN}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  )
}

const HeaderMain = () => {
  const router = useRouter()
  return (
    <Flex h='100%' align='center' justify='space-between' mx='2%'>
      <Flex
        gap='lg'
        align='center'
      >
        <Image src='/images/logo.png' alt='logo' h={80} w='auto' />
      </Flex>
      <Flex>
        {/* <Autocomplete
          leftSection={<IconSearch />}
          placeholder='Searching'
          radius={999}
          data={[
            { group: "Frontend", items: ["React", "Angular"] },
            { group: "Backend", items: ["Express", "Django"] },
          ]}
          size='lg'
          w={500}
          display={{ base: "none", md: "block" }}
        /> */}
      </Flex>
      <Flex justify='flex-end'>
        <Box display={{ base: "none", md: "block" }}>
          <PcSizeMenu />
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <BaseSizeMenu />
        </Box>
      </Flex>
    </Flex>
  )
}

export default HeaderMain
