import React, { useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Paper, List, ListItem, ListItemText } from "@mui/material";

function MessageList() {
  const { messages } = useAppContext();
  const paperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (paperRef.current) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        height: "calc(100vh - 210px)",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
      ref={paperRef}
    >
      <List>
        {messages.map((message, id) => (
          <ListItem key={id} alignItems="flex-start">
            <ListItemText primary={message.text} secondary={message.time} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default MessageList;
