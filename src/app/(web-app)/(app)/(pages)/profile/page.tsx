import React from "react"
import CardProfile from "./components/CardProfile"
import { Flex } from "@mantine/core"
import TabProfile from "./components/TabProfile"

const ProfilePage = () => {
  return (
    <>
      <Flex direction='column' gap='lg'>
        <CardProfile />
        <TabProfile />
      </Flex>
    </>
  )
}

export default ProfilePage
