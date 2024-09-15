import Data from '../../Data.json';

const {titles, authors, summaries} = Data;

export const getTitles = (id) => id ? titles[id] : titles;

export const getAuthors = () => authors;

export const getSummaries = () => summaries;