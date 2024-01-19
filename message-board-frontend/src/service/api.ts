import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const getChannels = async () => {
  const response = await axios.get(`${BASE_URL}/channels`);
  return response.data;
};

export const getMessages = async (channelId: number) => {
  const response = await axios.get(`${BASE_URL}/messages/${channelId}`);
  console.log(response.data);
  return response.data;
};

export const postMessage = async (
  channelId: number,
  data: { text: string }
) => {
  const response = await axios.post(`${BASE_URL}/${channelId}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
