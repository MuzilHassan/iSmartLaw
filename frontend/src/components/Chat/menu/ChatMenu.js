import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Search from "./Search";
import Conversations from "./Conversations";
const ChatMenu = () => {
  const [text, setText] = useState("");
  return (
    <Box>
      <Header />
      <Search setText={setText} />
      <Conversations text={text} />
    </Box>
  );
};

export default ChatMenu;
