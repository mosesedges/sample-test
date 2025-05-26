import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";
import { vi, expect, describe, test } from "vitest";
import "@testing-library/jest-dom";

describe("Pagination Component", () => {
  test("renders pagination component with correct page number", () => {
    render(<Pagination page={1} onPrevious={() => {}} onNext={() => {}} />);

    expect(screen.getByText("Page 2")).toBeInTheDocument();
  });

  test("calls onPrevious when previous button is clicked", async () => {
    const user = userEvent.setup();
    const onPreviousMock = vi.fn();
    render(
      <Pagination page={1} onPrevious={onPreviousMock} onNext={() => {}} />
    );

    await user.click(screen.getByText("Previous"));
    expect(onPreviousMock).toHaveBeenCalledTimes(1);
  });

  test("calls onNext when next button is clicked", async () => {
    const user = userEvent.setup();
    const onNextMock = vi.fn();
    render(<Pagination page={1} onPrevious={() => {}} onNext={onNextMock} />);

    await user.click(screen.getByText("Next"));
    expect(onNextMock).toHaveBeenCalledTimes(1);
  });

  test("disables previous button when isPreviousDisabled is true", () => {
    render(
      <Pagination
        page={1}
        onPrevious={() => {}}
        onNext={() => {}}
        isPreviousDisabled
      />
    );

    expect(screen.getByText("Previous")).toBeDisabled();
  });

  test("disables next button when isNextDisabled is true", () => {
    render(
      <Pagination
        page={1}
        onPrevious={() => {}}
        onNext={() => {}}
        isNextDisabled
      />
    );

    expect(screen.getByText("Next")).toBeDisabled();
  });
});
