"use client"

import { Tabs } from "@mantine/core"
import React from "react"
import FeedProfile from "./tabs/FeedProfile"

const TABS_PROFILE = [
  { label: "Posts", value: "post", content: <FeedProfile /> },
  { label: "Gallery", value: "gallery", content: <></> },
  { label: "About", value: "about", content: <></> },
]

const TabProfile = () => {
  return (
    <>
      <Tabs defaultValue='post'>
        <Tabs.List justify='space-evenly'>
          {TABS_PROFILE.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value} w='30%'>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {TABS_PROFILE.map((tab) => (
          <Tabs.Panel key={tab.value} value={tab.value}>
            {tab.content}
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  )
}

export default TabProfile
