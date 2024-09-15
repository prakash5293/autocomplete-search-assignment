import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import * as util from '../../utils/utils';
import List from "./List";


const mockedAuthor = [{ id: 1, name: "author" }];
const mockedSummary =  [{ id: 1, summary: "some text history" }];
const mockedTitles =  ["title1", "title2"];

jest.mock('../../utils/utils', () => ({
    getAuthors: jest.fn(),
    getSummaries: jest.fn(),
    getTitles: jest.fn(),
  }));

describe("List", () => {

    beforeEach(() => {
        util.getAuthors.mockReturnValue(mockedAuthor);
        util.getSummaries.mockReturnValue(mockedSummary);
        util.getTitles.mockReturnValue(mockedTitles)
      });
    afterEach(() => jest.clearAllMocks()); 

    it("should render List component", () => {
        render(<List searchedValue={"history"}  resetValue={false} />)
        expect(screen.getAllByTestId("search-list")).toBeDefined();
    });

    it("should invoke selectedList on list-item click", () => {
        const mockSelectedList = jest.fn();
        render(<List searchedValue={"history"} resetValue={false} selectedList={mockSelectedList}/>);

        fireEvent.click(screen.getByTestId("search-item"));
        expect(mockSelectedList).toHaveBeenCalled();
    });

    it("should not render list when resetValue set true", () => {
        const mockSelectedList = jest.fn();
        render(<List searchedValue={"history"} resetValue={true} selectedList={mockSelectedList}/>);
        expect(screen.queryByTestId("search-list")).toBeNull();
        
    });
});