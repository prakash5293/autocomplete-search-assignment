import { getAuthors, getTitles, getSummaries } from "./utils";

jest.mock("../../Data.json", () => ({
  authors: [{ id: "123", name: "author" }],
  summaries: [{ id: "1", summary: "some text" }],
  titles: ["title1", "title2"],
}));
describe("utils", () => {
  it("should return authours list", () => {
    expect(getAuthors()).toStrictEqual([{ id: "123", name: "author" }]);
  });

  it("should return summaries ", () => {
    expect(getSummaries()).toStrictEqual([{ id: "1", summary: "some text" }]);
  });

  it("should return title based on index ", () => {
    expect(getTitles(1)).toBe("title2");
  });

  it("should return title based without index ", () => {
    expect(getTitles()).toStrictEqual(["title1", "title2"]);
  });
});
