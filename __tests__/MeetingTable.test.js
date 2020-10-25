import { render } from "@testing-library/react";
import MeetingTable from "../components/MeetingTable";


describe("MeetingTable Component", () => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    it("should render properly", () => {
        const subject = render(<MeetingTable />);
        const tree = subject.container;
        expect(tree).toMatchSnapshot();
    });
});