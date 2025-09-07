import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Toast } from "../components/Toast";

describe("Toast Component", () => {
  it("renders success toast correctly", () => {
    const mockOnClose = () => {};

    render(
      <Toast
        message="Test success message"
        type="success"
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("Test success message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("alert-success");
  });

  it("renders error toast correctly", () => {
    const mockOnClose = () => {};

    render(
      <Toast message="Test error message" type="error" onClose={mockOnClose} />
    );

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("alert-error");
  });
});
