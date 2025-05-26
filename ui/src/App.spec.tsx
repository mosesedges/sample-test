import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { vi, describe, test, expect, afterEach } from "vitest";
import * as useDataModule from "./utils/useData";
import "@testing-library/jest-dom";

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

// Mock the useData hook
vi.mock("./utils/useData", async () => {
  const actual = await vi.importActual<typeof useDataModule>("./utils/useData");
  return {
    ...actual,
    useData: vi.fn(() => ({
      data: mockData,
      isPending: false,
      refetch: vi.fn(() => Promise.resolve({ data: mockData })),
    })),
  };
});

describe("App Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("1. Renders search box and pagination controls", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeInTheDocument();
  });

  test("2. Displays data cards after fetch", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText("Astronomy Today")).toBeInTheDocument()
    );
    expect(screen.getByText(/Cosmos Media Group/)).toBeInTheDocument();
  });

  test("3. Triggers search and resets page", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox");
    const searchBtn = screen.getByRole("button", { name: /search/i });

    await user.type(input, "space");
    await user.click(searchBtn);

    await waitFor(() =>
      expect(screen.getByText("Astronomy Today")).toBeInTheDocument()
    );
  });

  test("4. Handles pagination button clicks", async () => {
    const user = userEvent.setup();
    render(<App />);

    const nextBtn = screen.getByRole("button", { name: /next/i });
    await user.click(nextBtn);

    await waitFor(() =>
      expect(screen.getByText("Astronomy Today")).toBeInTheDocument()
    );
  });

  test("5. Updates document title on filter change", async () => {
    const user = userEvent.setup();
    render(<App />);

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "title");

    await waitFor(() => expect(document.title).toContain("title"));
  });
});
