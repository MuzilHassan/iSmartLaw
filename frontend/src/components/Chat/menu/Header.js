import React from "react";

import { Box, styled } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const Component = styled(Box)`
  background: #ededed;
  height: 45px;
  padding: 8px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const Header = () => {
  return (
    <Component>
      <MoreVertIcon />
    </Component>
  );
};

export default Header;
