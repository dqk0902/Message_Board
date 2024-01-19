import React, { useContext } from "react";
import { useAppContext } from "../context/AppContext";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function MessageList() {
  const { messages } = useAppContext();

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", height: "73vh", overflowY: "auto" }}
    >
      <List>
        {messages.map((message, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={message.text}
              secondary={<React.Fragment>{message.date}</React.Fragment>}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default MessageList;
