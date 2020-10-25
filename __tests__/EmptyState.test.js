import { render, screen } from "@testing-library/react";
import EmptyState from "../components/EmptyState";

describe("EmptyState", () => {
    it("renders without crashing", () => {
        const { getByTestId } = render(<EmptyState />);
        const emptyState = getByTestId("empty-state");
        expect(emptyState).toBeInTheDocument();
    });
});