import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Pagination } from "../components/Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = () => {};

  it("renders pagination with correct page numbers", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("shows correct active page", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const activePage = screen.getByText("3");
    expect(activePage.closest("button")).toHaveClass("btn-active");
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText("Previous page");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText("Next page");
    expect(nextButton).toBeDisabled();
  });
});
