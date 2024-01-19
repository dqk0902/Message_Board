import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getChannels, getMessages, postMessage } from "../../service/api";

const mock = new MockAdapter(axios);

const mockChannels = [
  { id: 1, name: "Channel 1" },
  { id: 2, name: "Channel 2" },
];
const mockMessages = [
  { id: 1, text: "Message 1" },
  { id: 2, text: "Message 2" },
];

mock.onGet("http://localhost:3001/channels").reply(200, mockChannels);
mock.onGet("http://localhost:3001/messages/1").reply(200, mockMessages);
mock.onPost("http://localhost:3001/1").reply(201, { success: true });

describe("Test api", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  test("getChannels returns channels", async () => {
    const result = await getChannels();
    expect(result).toEqual(mockChannels);
  });

  test("getMessages returns messages for a channel", async () => {
    const channelId = 1;
    const result = await getMessages(channelId);
    expect(result).toEqual(mockMessages);
  });

  test("postMessage posts a message to a channel", async () => {
    const channelId = 1;
    const data = { text: "New message" };
    const result = await postMessage(channelId, data);
    expect(result).toEqual({ success: true });
  });
});
