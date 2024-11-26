"use client"

import { Button, Flex, Image, Paper, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import React, { useEffect, useState } from "react"
import EditProfile from "./forms/EditProfile"
import { useUserStore } from "@/stores/useUserStore"

const BASE_URL = "http://localhost:5000"

const CardProfile = () => {
  const { currentUser } = useUserStore()
  const [opened, { open, close }] = useDisclosure(false)
  const [isLoading, setIsLoading] = useState(true) // State สำหรับรอ currentUser
  const mode = "create"

  useEffect(() => {
    // เมื่อ currentUser พร้อมแล้ว ให้ set isLoading เป็น false
    if (currentUser) {
      setIsLoading(false)
      console.log(currentUser)
    }
  }, [currentUser])

  if (isLoading) {
    // แสดง loading state ขณะรอ currentUser
    return (
      <Flex justify='center' align='center' style={{ height: "450px" }}>
        <Title order={3}>Loading...</Title>
      </Flex>
    )
  }

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
          backgroundImage: `url('https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png')`,
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
                  currentUser?.profile
                    ? `${BASE_URL}${currentUser.profile}`
                    : "https://via.placeholder.com/150"
                }
                alt='profile'
                w={175}
                h={175}
                radius={999}
              />
            </Flex>
            <Flex justify='center' direction='column' align='start' gap='md'>
              <Title order={1}>
                {currentUser?.firstName + " " + currentUser?.lastName}
              </Title>
              <Title order={6}>@{currentUser?.username}</Title>
              <Title order={4}>{currentUser?.bio}</Title>
              <Flex gap='lg'>
                <Title order={6}>Follower: {currentUser?.follower}</Title>
                <Title order={6}>Following: {currentUser?.following}</Title>
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

          <EditProfile opened={opened} close={close} />
        </Flex>
      </Paper>
    </>
  )
}

export default CardProfile
