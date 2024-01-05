import { act, fireEvent, render } from "@testing-library/react";
import { HelpSection } from "./help-section";

const mockDispatch = jest.fn();
jest.mock("../context/contexts", () => ({
  ...jest.requireActual("../context/contexts"),
  useServerRequestContext: jest.fn(() => {
    return {
      state: {
        tipsList: [
          <div key="first">First tip</div>,
          <div key="last">Last tip</div>,
        ],
      },
      dispatch: mockDispatch,
    };
  }),
}));
jest.mock("./tips", () => {
  return {
    RootTypesDesc: jest.fn().mockReturnValue(<div>RootTypesDesc</div>),
  };
});

describe("Help section", () => {
  it("should render content with tips (when they exist)", () => {
    const { getByText } = render(<HelpSection />);

    const backBtn = getByText("< Back");

    expect(getByText("Server's Documentation")).toBeInTheDocument();
    expect(getByText("Last tip")).toBeInTheDocument();
    expect(backBtn).toBeInTheDocument();

    act(() => {
      fireEvent.click(backBtn);
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
