import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function MessageEditor() {
  const { selectedChannel, submitMessage } = useAppContext();
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    // Reset input when switching channels
    setMessageText("");
  }, [selectedChannel]);

  const handleSubmit = () => {
    if (messageText.trim() !== "") {
      submitMessage(messageText);
      setMessageText("");
    }
  };

  return (
    <TextField
      value={messageText}
      onChange={(e) => setMessageText(e.target.value)}
      placeholder="Aa"
      fullWidth
      variant="outlined"
      margin="normal"
      InputProps={{
        endAdornment: (
          <IconButton
            color="primary"
            onClick={handleSubmit}
            disabled={!messageText.trim()}
            data-testid="send-button"
          >
            <SendIcon />
          </IconButton>
        ),
      }}
    />
  );
}

export default MessageEditor;
