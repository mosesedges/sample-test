import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, test, expect, beforeEach } from "vitest";
import { SearchBox } from "./Search";
import "@testing-library/jest-dom";

describe("SearchBox", () => {
  let handleSearchInputChange: ReturnType<typeof vi.fn>;
  let handleSearch: ReturnType<typeof vi.fn>;
  let handleFieldChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handleSearchInputChange = vi.fn();
    handleSearch = vi.fn();
    handleFieldChange = vi.fn();

    render(
      <SearchBox
        searchTerm=""
        selectedField=""
        onSearchInputChange={handleSearchInputChange}
        onSearch={handleSearch}
        onFieldChange={handleFieldChange}
      />
    );
  });

  test("renders input, select field, and button correctly", () => {
    const input = screen.getByPlaceholderText("Search for a video...");
    const button = screen.getByRole("button", { name: "Execute search" });
    const select = screen.getByLabelText("Search filter");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });

  test("calls onSearchInputChange when typing into input", async () => {
    const input = screen.getByPlaceholderText("Search for a video...");
    await userEvent.type(input, "React testing");

    expect(handleSearchInputChange).toHaveBeenCalled();
  });

  test("calls onSearch when search button is clicked", async () => {
    const button = screen.getByRole("button", { name: "Execute search" });
    await userEvent.click(button);

    expect(handleSearch).toHaveBeenCalled();
  });

  test("calls onFieldChange when filter select is changed", async () => {
    const select = screen.getByLabelText("Search filter");
    await userEvent.selectOptions(select, "title");

    expect(handleFieldChange).toHaveBeenCalled();
  });
});
