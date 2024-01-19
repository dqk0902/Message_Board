import React from "react";
import { render, screen, act } from "@testing-library/react";
import { AppProvider } from "../../context/AppContext";
import MessageList from "../../components/MessageList";
import * as appContext from "../../context/AppContext";
import * as Api from "../../service/api";

const mockMessages = [
  {
    date: "20:6",
    id: "f2807516-d0ca-4477-a91b-3e5ea8ed9331",
    text: "Hello world",
  },
];

jest.mock("../../hooks/useSocket", () => ({
  useSocket: jest.fn(() => ({
    socket: { emit: jest.fn(), on: jest.fn(), off: jest.fn() },
  })),
}));

describe("MessageList", () => {
  jest.spyOn(appContext, "useAppContext").mockReturnValue({
    messages: [
      {
        date: "20:6",
        id: "f2807516-d0ca-4477-a91b-3e5ea8ed9331",
        text: "Hello world",
      },
    ],
  } as never);
  it("renders messages correctly", async () => {
    await act(async () => {
      render(
        <AppProvider>
          <MessageList />
        </AppProvider>
      );
    });

    // Assert that each message text is visible in the rendered component
    mockMessages.forEach((message) => {
      expect(screen.getByText(message.text)).toBeInTheDocument();
    });

    // Assert that each message date is visible in the rendered component
    mockMessages.forEach((message) => {
      expect(screen.getByText(message.date)).toBeInTheDocument();
    });
  });
});
