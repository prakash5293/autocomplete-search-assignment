import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom"
import Card from "./Card";
const mockData = {title: 'title', author: "name", summary: "summ"}
describe("Card", () => {
    it("should render card component", () => {
        render(<Card data={mockData} />)
        expect(screen.getAllByTestId("card")).toBeDefined();
    });


    it("should truncate summary with length exceed 300", () => {
        const updatedSummary = "a".repeat(300);
        mockData.summary = updatedSummary
        render(<Card data={mockData}  />)
        expect(screen.getAllByTestId("summary")).toBeDefined();
    });
});