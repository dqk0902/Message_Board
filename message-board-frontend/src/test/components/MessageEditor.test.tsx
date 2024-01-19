import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { AppProvider } from "../../context/AppContext";
import MessageEditor from "../../components/MessageEditor";
import userEvent from "@testing-library/user-event";

jest.mock("../../hooks/useSocket", () => ({
  useSocket: jest.fn(() => ({
    socket: { emit: jest.fn(), on: jest.fn(), off: jest.fn() },
  })),
}));

describe("MessageEditor", () => {
  it("submits a message when button is clicked", async () => {
    await act(async () => {
      render(
        <AppProvider>
          <MessageEditor />
        </AppProvider>
      );
    });

    await act(async () => {
      userEvent.type(screen.getByRole("textbox"), "Hello, world!");
    });

    expect(screen.getByRole("textbox")).toHaveValue("Hello, world!");

    await act(async () => {
      userEvent.click(screen.getByTestId("send-button"));
    });

    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});
