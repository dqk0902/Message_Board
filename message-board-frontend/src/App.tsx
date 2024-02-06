import React from "react";
import { useAppContext } from "./context/AppContext";
import ChannelList from "./components/ChannelList";
import MessageList from "./components/MessageList";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

function App() {
  const { selectedChannel } = useAppContext();

  return (
    <Grid container spacing={2} style={{ overflow: "hidden" }}>
      <Grid item xs={12} height="10vh">
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: "#1976D2",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "2px",
            paddingTop: "10px",
            paddingBottom: "5px",
          }}
        >
          Message Board App
        </Typography>
      </Grid>

      <Grid container item spacing={2}>
        <Grid item xs={3}>
          <ChannelList />
        </Grid>

        <Grid item xs={9} height="90vh" display="flex">
          {selectedChannel !== null ? (
            <MessageList />
          ) : (
            <Grid container justifyContent="center" alignItems="center">
              <Typography variant="h6" color="textSecondary" align="center">
                Select a channel to view messages.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
