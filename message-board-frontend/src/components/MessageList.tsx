import React, { useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Paper, List, ListItem, ListItemText, Box } from "@mui/material";
import MessageEditor from "./MessageEditor";

function MessageList() {
  const { allMessages, selectedChannel } = useAppContext();
  const paperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (paperRef.current) {
      paperRef.current.scrollTop = paperRef.current.scrollHeight;
    }
  }, [allMessages]);

  return (
    <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          overflowY: "auto",
          scrollBehavior: "smooth",
          flex: 1,
        }}
        ref={paperRef}
      >
        <List>
          {selectedChannel &&
            allMessages[selectedChannel] &&
            allMessages[selectedChannel].messages.map((message, id) => (
              <ListItem key={id} alignItems="flex-start">
                <ListItemText primary={message.text} secondary={message.time} />
              </ListItem>
            ))}
        </List>
      </Paper>
      <MessageEditor />
    </Box>
  );
}

export default MessageList;
