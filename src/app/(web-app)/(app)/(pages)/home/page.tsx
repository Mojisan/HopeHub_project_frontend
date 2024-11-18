"use client";

import { Box, Flex, Title, Text } from "@mantine/core";
import React from "react";

interface HomePageProps {
  selectedTopic: string;
}

const HomePage = ({ selectedTopic }: HomePageProps) => {
  return (
    <Box>
      <Flex>
        <Box ml="md" w="100%">
          {/* แสดงชื่อ Topic ที่เลือกเป็น Title ของหน้า */}
          <Title>{selectedTopic || "Home"}</Title>
          <Text>
            {selectedTopic
              ? `Showing content for: ${selectedTopic}`
              : "Please select a topic from the sidebar"}
          </Text>
          {selectedTopic === "Horror" && (
            <Text>Here are the questions related to Horror.</Text>
          )}
          {selectedTopic === "Blogs" && (
            <Text>Here are the resources related to Blogs.</Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default HomePage;
