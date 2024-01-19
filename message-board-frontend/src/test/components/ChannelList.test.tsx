import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { AppProvider } from "../../context/AppContext";
import ChannelList from "../../components/ChannelList";
import * as appContext from "../../context/AppContext";
import * as Api from "../../service/api";

jest.mock("../../hooks/useSocket", () => ({
  useSocket: jest.fn(() => ({
    socket: { emit: jest.fn(), on: jest.fn(), off: jest.fn() },
  })),
}));

describe("ChannelList", () => {
  beforeEach(() => {
    jest.spyOn(Api, "getChannels").mockResolvedValue([
      { id: 1, name: "Channel 1" },
      { id: 2, name: "Channel 2" },
    ]);
  });

  it("renders channels correctly", async () => {
    await act(async () => {
      render(
        <AppProvider>
          <ChannelList />
        </AppProvider>
      );
    });

    expect(screen.getByText("Channel 1")).toBeVisible();
    expect(screen.getByText("Channel 2")).toBeVisible();
  });

  it("selects a channel when clicked", async () => {
    await act(async () => {
      render(
        <AppProvider>
          <ChannelList />
        </AppProvider>
      );
    });

    fireEvent.click(screen.getByText("Channel 2"));

    const searchInput = screen.getByLabelText("Search channels");
    expect(searchInput).toBeVisible();
    expect(searchInput).toHaveValue("");
  });

  it("updates search term correctly", async () => {
    await act(async () => {
      render(
        <AppProvider>
          <ChannelList />
        </AppProvider>
      );
    });

    const searchInput = screen.getByLabelText("Search channels");

    fireEvent.change(searchInput, { target: { value: "Channel 2" } });

    expect(searchInput).toHaveValue("Channel 2");
  });
});
