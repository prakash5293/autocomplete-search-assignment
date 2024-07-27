import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookCard from './BookCard';

// Mock the BookAuthorIcon component
vi.mock('../BookAuthorIcon', () => ({
    default: () => <span data-testid="book-author-icon" />
}));

const mockBook = {
    id: 1,
    title: 'Test Book Title',
    summary: 'This is a summary of the test book.',
    author: 'Test Author',
};

describe('BookCard', () => {
    it('renders book card with required elements', () => {
        render(<BookCard book={mockBook} onRemove={() => { }} />);

        const titleElement = screen.getByText(/Test Book Title/i);
        expect(titleElement).toBeInTheDocument();

        const summaryElement = screen.getByText(/This is a summary of the test book./i);
        expect(summaryElement).toBeInTheDocument();

        const authorElement = screen.getByText(/Test Author/i);
        expect(authorElement).toBeInTheDocument();

        const iconElement = screen.getByTestId('book-author-icon');
        expect(iconElement).toBeInTheDocument();
    });
});
