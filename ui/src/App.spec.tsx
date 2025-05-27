import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { vi, describe, test, expect, afterEach } from "vitest";
import * as useDataModule from "./hooks/useData";
import "@testing-library/jest-dom";
import { renderWithQueryClient } from "./utils/testUtils";

const mockData = {
  contributions: [
    {
      id: 19,
      title: "Astronomy Today",
      description: "Updates on the latest discoveries in astronomy.",
      startTime: "2024-05-27T12:30:00Z",
      endTime: "2024-05-27T13:00:00Z",
      owner: "Cosmos Media Group",
    },
  ],
};

const refetchMock = vi.fn(() => Promise.resolve({ data: mockData }));

// Mock the useData hook
vi.mock("./hooks/useData", async () => {
  const actual = await vi.importActual<typeof useDataModule>("./hooks/useData");
  return {
    ...actual,
    useData: vi.fn(() => ({
      data: mockData,
      isPending: false,
      refetch: refetchMock,
    })),
  };
});

describe("App Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("1. Renders search box and pagination controls", () => {
    render(renderWithQueryClient(<App />));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("2. Displays data cards after fetch", async () => {
    render(renderWithQueryClient(<App />));
    await waitFor(() =>
      expect(screen.getByText("Astronomy Today")).toBeInTheDocument()
    );
    expect(screen.getByText(/Cosmos Media Group/)).toBeInTheDocument();
  });

  test("3. Triggers search and resets page", async () => {
    const user = userEvent.setup();
    render(renderWithQueryClient(<App />));

    const input = screen.getByRole("textbox");
    const searchBtn = screen.getByRole("button", { name: /search/i });

    await user.type(input, "space");
    await user.click(searchBtn);

    await waitFor(() => expect(refetchMock).toHaveBeenCalled());
  });

  test("4. Handles pagination button clicks", async () => {
    const user = userEvent.setup();
    render(renderWithQueryClient(<App />));

    const nextBtn = screen.getByRole("button", { name: /next/i });
    await user.click(nextBtn);

    await waitFor(() => expect(refetchMock).toHaveBeenCalled());
  });
});
