import React from 'react';
import {render, screen} from "@testing-library/react";
import * as util from '../../utils/utils';
import CardList from "./CardList";

const mockData = {id: 1, "titleName": "title"};
const mockedAuthor = [{ id: 1, name: "author" }];
const mockedSummary =  [{ id: 1, summary: "some text" }];

jest.mock('../../utils/utils', () => ({
    getAuthors: jest.fn(),
    getSummaries: jest.fn(),
  }));
describe("CardList", () => {
    beforeEach(() => {
        util.getAuthors.mockReturnValue(mockedAuthor);
        util.getSummaries.mockReturnValue(mockedSummary);
      });
    afterEach(() => jest.clearAllMocks());  

    it("should render cardList component", () => {
        render(<CardList selectedTitle={mockData} />)
        expect(screen.getByTestId("card")).toBeDefined();
    });

    it("should not render card when not item selected", () => {
        render(<CardList selectedTitle={{}} />);
        expect(screen.queryByTestId("card")).toBeNull();
    });
});