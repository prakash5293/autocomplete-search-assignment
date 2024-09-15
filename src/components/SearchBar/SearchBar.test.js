import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import SearchBar from './SearchBar';;

describe("SearchBar", () => {
    const mockedHandleValue = jest.fn();
    it("should render SearchBar component", () => {
        render(<SearchBar handleValue={mockedHandleValue} resetValue={false}/>)
        expect(screen.getByTestId("search-bar")).toBeDefined();
    });

    it("should reset searched value when resetValue set true", () => {
        render(<SearchBar handleValue={mockedHandleValue} resetValue={true}/>)
        expect(screen.getByTestId("search-bar").value).toBe("");
    });

    it("should invoke handleValue onChange of searched value", () => {
        render(<SearchBar handleValue={mockedHandleValue} resetValue={true}/>)
         const input = screen.getByTestId("search-bar");

        fireEvent.change(input, { target: { value: 'ab' } });
        expect(screen.getByTestId("search-bar").value).toBe("ab");
        expect(mockedHandleValue).toHaveBeenCalled();
    });
        
});