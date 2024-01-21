import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useSocket } from "../hooks/useSocket";
import { getChannels, getMessages, postMessage } from "../service/api";
import { Channel } from "../types/channels";
import { Message } from "../types/message";

export interface AppContextProps {
  channels: Channel[];
  selectedChannel: number | null;
  messages: Message[];
  selectChannel: (channelId: number) => void;
  submitMessage: (text: string) => void;
}

export interface AppProviderProps {
  children: ReactNode;
}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AppContext = createContext<AppContextProps>(null!);

export function AppProvider({ children }: AppProviderProps) {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    const fetchChannels = async () => {
      const fetchedChannels = await getChannels();
      setChannels(fetchedChannels);
    };

    // Fetch initial channel list
    fetchChannels();
  }, []);

  const selectChannel = (channelId: number) => {
    setSelectedChannel(channelId);
    socket?.emit("join", channelId);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChannel !== null) {
        const fetchedMessages = await getMessages(selectedChannel);
        setMessages(fetchedMessages);
      }
    };
    fetchMessages();
  }, [selectedChannel]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (message: Message, channelId: number | null) => {
        console.log(message, channelId);
        if (selectedChannel === channelId) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      socket.on("newMessage", handleNewMessage);
      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [selectedChannel, socket]);

  const submitMessage = (text: string) => {
    if (selectedChannel !== null) {
      postMessage(selectedChannel, { text });
    }
  };

  const value: AppContextProps = {
    channels,
    selectedChannel,
    messages,
    selectChannel,
    submitMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useAppContext() {
  return useContext(AppContext);
}
