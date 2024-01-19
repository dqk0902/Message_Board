import React from "react";
import { render, act, fireEvent, screen } from "@testing-library/react";
import { AppProvider, useAppContext } from "../../context/AppContext";
import { getChannels } from "../../service/api";
import App from "../../App";
import * as Api from "../../service/api";
import * as appContext from "../../context/AppContext";

jest.mock("../../hooks/useSocket", () => ({
  useSocket: jest.fn(() => ({
    socket: { emit: jest.fn(), on: jest.fn(), off: jest.fn() },
  })),
}));

describe("AppProvider", () => {
  beforeEach(() => {
    jest.spyOn(Api, "getChannels").mockResolvedValue([
      { id: 1, name: "Channel 1" },
      { id: 2, name: "Channel 2" },
    ]);
    jest.spyOn(appContext, "useAppContext").mockReturnValue({
      messages: [
        {
          date: "20:6",
          id: "f2807516-d0ca-4477-a91b-3e5ea8ed9331",
          text: "Hello world",
        },
      ],
      channels: [
        { id: 1, name: "Channel 1" },
        { id: 2, name: "Channel 2" },
      ],
      selectedChannel: null,
      selectChannel: jest.fn(),
      submitMessage: jest.fn(),
    });
  });
  it("fetches channels on mount", async () => {
    await act(async () => {
      render(
        <AppProvider>
          <App />
        </AppProvider>
      );
    });
    expect(getChannels).toHaveBeenCalled();
  });
});
