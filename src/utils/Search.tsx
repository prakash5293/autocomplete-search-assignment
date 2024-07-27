import { data } from '../data/Data';

interface Summary {
    id: number;
    summary: string;
}

export const searchBooks = (query: string): Summary[] => {
    if (!query) return [];

    return data.summaries
        .map(summary => ({
            ...summary,
            count: (summary.summary.match(new RegExp(query, 'gi')) || []).length
        }))
        .filter(summary => summary.count > 0)
        .sort((a, b) => b.count - a.count);
};
