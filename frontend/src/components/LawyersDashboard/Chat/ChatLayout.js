import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
} from "@mui/material";
import { InputAdornment } from "@mui/material";

import CallIcon from "@mui/icons-material/Call";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";

const layoutStyle = {
  display: "flex",
  height: "87vh",
};

const contactListStyle = {
  width: "30%",
  backgroundColor: "#f8f9fa",
  boxShadow: "1px 0 5px rgba(0, 0, 0, 0.1)",
};

const chatAreaStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const messageContainerStyle = {
  flex: 1,
  overflowY: "auto",
  padding: "16px",
};

const messageStyle = {
  marginBottom: "8px",
  padding: "8px",
  backgroundColor: "#fff",
  borderRadius: "4px",
};

const inputContainerStyle = {
  display: "flex",
  alignItems: "center",
  borderTop: "1px solid #ccc",
  padding: "8px",
};

const inputStyle = {
  flex: 1,
  marginRight: "8px",
};

const iconButtonStyle = {
  marginRight: "8px",
};

const cardStyle = {
  flex: 1,
};

const ChatLayout = () => {
  const handleSendMessage = () => {
    // Logic for sending the message
  };

  const handleCall = () => {
    // Logic for initiating a call
  };

  const handleUploadImage = () => {
    // Logic for uploading an image
  };

  return (
    <div style={layoutStyle}>
      <Paper variant="outlined" style={contactListStyle}>
        <List component="nav" aria-label="mailbox folders">
          <ListItem button>
            <ListItemText primary="Inbox" />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText primary="Drafts" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </Paper>
      <div style={chatAreaStyle}>
        <Card variant="outlined" sx={cardStyle}>
          <CardContent style={messageContainerStyle}>
            <div style={messageStyle}>{/* Chat Messages */}</div>
          </CardContent>
          <CardContent>
            <div style={inputContainerStyle}>
              <TextField
                label="Type your message"
                fullWidth
                variant="outlined"
                style={inputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSendMessage}>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <IconButton style={iconButtonStyle}>
                <AttachFileIcon />
              </IconButton>
              <IconButton style={iconButtonStyle}>
                <MicIcon />
              </IconButton>
              <IconButton style={iconButtonStyle}>
                <CallIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatLayout;
