"use client";

import "@mantine/core/styles.css";
import { AppShell } from "@mantine/core";
import React, { useState } from "react";
import HeaderMain from "../(app)/components/HeaderMain";
import Sidebar from "../(app)/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  // ฟังก์ชันสำหรับอัปเดต Topic ที่เลือก
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
  };

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Header bg="blue">
        <HeaderMain />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {/* ส่ง callback ฟังก์ชันไปยัง Sidebar */}
        <Sidebar onTopicSelect={handleTopicSelect} />
      </AppShell.Navbar>

      <AppShell.Main>
        {/* ส่งค่า selectedTopic ไปยัง HomePage */}
        {React.cloneElement(children as React.ReactElement, { selectedTopic })}
      </AppShell.Main>
    </AppShell>
  );
}
