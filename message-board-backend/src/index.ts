import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const PORT = 3001;

app.use(express.json());
app.use(cors());

interface Channel {
  id: number;
  name: string;
  messages: { id: string; text: string }[];
}
// In-memory storage for channels and messages
const channels: Channel[] = [
  { id: 1, name: "Channel 1", messages: [] },
  { id: 2, name: "Channel 2", messages: [] },
  { id: 3, name: "Channel 3", messages: [] },
];

app.get("/channels", (req: Request, res: Response) => {
  res.json(channels.map(({ id, name }) => ({ id, name })));
});

app.get("/messages/:channelId", (req: Request, res: Response) => {
  const channelId = parseInt(req.params.channelId);
  const channel = channels.find((c) => c.id === channelId);
  res.json(channel ? channel.messages : []);
});

app.post("/:channelId", (req: Request, res: Response) => {
  const channelId = parseInt(req.params.channelId);
  const { text } = req.body;
  const channel = channels.find((c) => c.id === channelId);

  if (channel) {
    const date = new Date();
    const newMessage = {
      id: uuidv4(),
      text,
      date: `${date.getHours()}:${date.getMinutes()}`,
    };

    channel.messages.push(newMessage);

    // Send new message to all in channel except sender
    io.to(channelId.toString()).emit("newMessage", newMessage, channelId);

    res.json(newMessage);
  } else {
    res.status(404).json({ error: "Channel not found" });
  }
});

//Socket connected
io.on("connection", (socket: Socket) => {
  //When client join a room
  socket.on("join", (channelId: number) => {
    socket.join(channelId.toString());
  });

  //When client left a room
  socket.on("leave", (channelId: number) => {
    socket.leave(channelId.toString());
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
