import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { List, ListItemButton, ListItemText, TextField } from "@mui/material";

function ChannelList() {
  const { channels, selectChannel, selectedChannel } = useAppContext();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChannel = (channelId: number) => {
    setSearchTerm("");
    selectChannel(channelId);
  };

  return (
    <div>
      <TextField
        label="Search channels"
        variant="outlined"
        fullWidth
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {filteredChannels.map((channel) => (
          <ListItemButton
            key={channel.id}
            selected={channel.id === selectedChannel}
            onClick={() => handleSelectChannel(channel.id)}
          >
            <ListItemText primary={channel.name} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

export default ChannelList;
