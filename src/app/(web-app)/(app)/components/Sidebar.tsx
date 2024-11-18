import { ScrollArea, NavLink, Divider } from "@mantine/core";
import { IconBook, IconGhost } from "@tabler/icons-react";
import React from "react";

interface ISidebarProps {
  onTopicSelect: (topic: string) => void;
}

const SIDEBAR_CONFIG = [
  {
    label: "TOPICS",
    children: [
      { label: "Horror", icon: <IconGhost size={24} />, topic: "Horror" },
    ],
  },
  {
    label: "RESOURCES",
    children: [
      { label: "Blogs", icon: <IconBook size={24} />, topic: "Blogs" },
    ],
  },
];

function Sidebar({ onTopicSelect }: ISidebarProps) {
  return (
    <ScrollArea w="100%">
      {SIDEBAR_CONFIG.map((group, index) => (
        <NavLink key={index} label={group.label} variant="filled" defaultOpened>
          {group.children?.map((item, idx) => (
            <NavLink
              key={idx}
              label={item.label}
              leftSection={item.icon}
              onClick={() => onTopicSelect(item.topic)}
            />
          ))}
          <Divider />
        </NavLink>
      ))}
    </ScrollArea>
  );
}

export default Sidebar;
