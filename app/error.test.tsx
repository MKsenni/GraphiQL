import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Error from "./error";

describe("Error page", () => {
  jest.mock(
    "next/link",
    () =>
      ({ children }: { children: HTMLElement }) =>
        children
  );

  it("renders content", () => {
    render(
      <Error
        error={{ digest: "string", name: "name", message: "message" }}
        reset={function (): void {}}
      />
    );

    const errorHeader = screen.getByText("It looks like the app is broken...");
    const toMainBtn = screen.getByText("Welcome Page");
    const againBtn = screen.getByText("Try again");
    const notFoundImg = screen.getByAltText("error");

    expect(errorHeader).toBeInTheDocument();
    expect(toMainBtn).toBeInTheDocument();
    expect(againBtn).toBeInTheDocument();
    expect(notFoundImg).toBeInTheDocument();
  });

  it("Go-To-Main button should links to main", () => {
    render(
      <Error
        error={{ digest: "string", name: "name", message: "message" }}
        reset={function (): void {}}
      />
    );
    const toMainBtn = screen.getByText("Welcome Page");

    expect(toMainBtn.closest("a")).toHaveAttribute("href", "/");
  });
});