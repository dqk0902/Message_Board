import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
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
    <div>
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
    </div>
  );
}

export default MessageEditor;
