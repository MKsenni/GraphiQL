import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "./page";
import SessionProvider from "../SessionProvider";
import fetchMock from "jest-fetch-mock";

const mockRedirect = jest.fn();
jest.mock("next/navigation", () => ({
  redirect: () => mockRedirect,
}));

describe("Page", () => {
  it("renders content", async () => {
    const mockSession = {
      user: {
        name: "John Doe",
      },
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
    };
    fetchMock.mockResponse(JSON.stringify(mockSession));
    jest.mock("next-auth/react", () => ({
      useSession: jest
        .fn()
        .mockReturnValueOnce({ data: mockSession, status: "authenticated" }),
      signOut: jest.fn(),
    }));
    render(
      <SessionProvider session={mockSession}>
        <Page />
      </SessionProvider>
    );

    await waitFor(() => {
      const text = screen.getByText("Main Page");
      const name = screen.getByText("John Doe");

      expect(text).toBeInTheDocument();
      expect(name).toBeInTheDocument();
    });
  });
});
