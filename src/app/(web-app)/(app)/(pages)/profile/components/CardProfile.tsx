"use client"

import { Button, Flex, Image, Paper, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import React from "react"
import EditProfile from "./forms/EditProfile"

const MockInfoUser = {
  firstName: "Apex",
  lastName: "Sunhur",
  username: "apexsunhur",
  bio: `I'm gay`,
  profile: `url('https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png')`,
  follower: 17,
  following: 25,
}

const CardProfile = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const mode = "create"

  return (
    <>
      <Paper
        shadow='sm'
        p='lg'
        radius='md'
        withBorder
        style={{
          width: "100%",
          height: "450px",
          backgroundImage: MockInfoUser.profile,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Flex align='flex-end' justify='space-between' p='lg' w='100%' h='100%'>
          <Flex h={175} gap='lg'>
            <Flex>
              <Image
                src={
                  "https://scontent.fbkk28-1.fna.fbcdn.net/v/t39.30808-6/461777954_2717182748460189_2007714974171785667_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFV0kWYhUL5KyqSrB1Fy7mQU2KMqiI23gpTYoyqIjbeCst_u-Vbm9-fMNqZVea9KaqvfaXQoWYMjdnAKWsbsHRn&_nc_ohc=1wujiHHl-TIQ7kNvgGuFBkt&_nc_zt=23&_nc_ht=scontent.fbkk28-1.fna&_nc_gid=AHW37Dq6BA9NvbzcRuO-fXR&oh=00_AYBsuVBWNxzjTXrFco_Nwz4gCd5kaQGJiJ-OnP1gkFMAbg&oe=67474A23"
                }
                alt=''
                w={175}
                h={175}
                radius={999}
              />
            </Flex>
            <Flex justify='center' direction='column' align='start' gap='md'>
              <Title order={1}>
                {MockInfoUser.firstName + " " + MockInfoUser.lastName}
              </Title>
              <Title order={6}>@{MockInfoUser.username}</Title>
              <Title order={4}>{MockInfoUser.bio}</Title>
              <Flex gap='lg'>
                <Title order={6}>Follower: {MockInfoUser.follower}</Title>
                <Title order={6}>Following: {MockInfoUser.following}</Title>
              </Flex>
            </Flex>
          </Flex>
          <Flex align='center'>
            {mode == "create" ? (
              <Button size='lg' onClick={open}>
                Edit Profile
              </Button>
            ) : (
              <Button size='lg'>Follow</Button>
            )}
          </Flex>

          <EditProfile opened={opened} close={close} userId={"1"} />
        </Flex>
      </Paper>
    </>
  )
}

export default CardProfile
