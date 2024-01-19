import React from "react";
import { render, act, fireEvent, screen } from "@testing-library/react";
import { AppProvider, useAppContext } from "../../context/AppContext";
import { getChannels } from "../../service/api";
import App from "../../App";


jest.mock("../../hooks/useSocket", () => ({
  useSocket: jest.fn(() => ({ socket: { emit: jest.fn(), on: jest.fn(), off: jest.fn() } })),
}));


jest.mock("../../service/api", () => ({
  getChannels: jest.fn(() => Promise.resolve([])),
  getMessages: jest.fn(() => Promise.resolve([])),
  postMessage: jest.fn(),
}));

describe("AppProvider", () => {
  it("fetches channels on mount", async () => {
    await act(async () => {
      render(
        <AppProvider>
          <App />
        </AppProvider>
      );
    });
    screen.debug();
    expect(getChannels).toHaveBeenCalled();
  });

/*   it("selects a channel and joins the socket room", async () => {
    render(
      <AppProvider>
        <div>Test Child</div>
      </AppProvider>
    );


    await screen.findByText("Test Child");

    const { result } = useAppContext();

    // Select a channel
    act(() => {
      result.current.selectChannel(1);
    });

    // Assert that the selected channel is updated
    expect(result.current.selectedChannel).toBe(1);

    // Assert that socket.emit is called with the correct arguments
    expect(result.current.socket.emit).toHaveBeenCalledWith("join", 1);
  });

    
  }); */

/*   it("fetches messages when the selected channel changes", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAppContext());

    act(() => {
      result.current.selectChannel(1);
    });

    await waitForNextUpdate();

    expect(await getMessages).toHaveBeenCalledWith(1);
  });

  it("submits a message", () => {
    const { result } = renderHook(() => useAppContext());

    act(() => {
      result.current.submitMessage("Hello, World!");
    });

    expect(postMessage).toHaveBeenCalledWith(result.current.selectedChannel, { text: "Hello, World!" });
  }); */
});

