import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { searchBooks } from './utils/Search';

// Mock the searchBooks function and data module
vi.mock('./utils/Search', () => ({
    searchBooks: vi.fn(),
}));

vi.mock('./data/Data', () => ({
    data: {
        titles: {
            1: 'Test Book 1',
            2: 'Test Book 2',
        },
        authors: [
            { book_id: 1, author: 'Author 1' },
            { book_id: 2, author: 'Author 2' },
        ],
    },
}));

describe('App', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('renders heading and initial text', () => {
        render(<App />);
        const headingElement = screen.getByRole('heading', { name: /Autocomplete Search/i });
        const noResultsText = screen.getByText(/No books have been added yet/i);

        expect(headingElement).toBeInTheDocument();
        expect(noResultsText).toBeInTheDocument();
    });

    it('updates the selected books and renders BookCard on selecting a book', () => {
        (searchBooks as jest.Mock).mockReturnValue([{ id: 1, summary: 'Test Summary 1' }]);

        render(<App />);
        const inputElement = screen.getByPlaceholderText(/Search books.../i);

        fireEvent.change(inputElement, { target: { value: 'Test' } });

        const suggestionElement = screen.getByText(/Test Book 1/i);
        fireEvent.click(suggestionElement);

        const bookTitle = screen.getByText(/Test Book 1/i);
        const bookSummary = screen.getByText(/Test Summary 1/i);
        const bookAuthor = screen.getByText(/Author 1/i);

        expect(bookTitle).toBeInTheDocument();
        expect(bookSummary).toBeInTheDocument();
        expect(bookAuthor).toBeInTheDocument();
    });

    it('displays success snackbar when a book is added', () => {
        (searchBooks as jest.Mock).mockReturnValue([{ id: 1, summary: 'Test Summary 1' }]);

        render(<App />);
        const inputElement = screen.getByPlaceholderText(/Search books.../i) as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: 'Test' } });

        const suggestionElement = screen.getByText(/Test Book 1/i);
        fireEvent.click(suggestionElement);

        expect(screen.getByText(/Book added!/i)).toBeInTheDocument();
    });

    it('displays error snackbar when a book already exists', async () => {
        (searchBooks as jest.Mock).mockReturnValue([{ id: 1, summary: 'Test Summary 1' }]);

        render(<App />);
        const inputElement = screen.getByPlaceholderText(/Search books.../i) as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: 'Test' } });

        const suggestionElement = await screen.findByText(/Test Book 1/i);
        fireEvent.click(suggestionElement);

        expect(screen.getByText(/Book added!/i)).toBeInTheDocument();

        fireEvent.change(inputElement, { target: { value: 'Test' } });
        fireEvent.click(suggestionElement);

        const selectedBookElement = screen.getByRole('select-book-0');
        fireEvent.click(selectedBookElement);

        const selectedBooks = screen.queryAllByText(/Test Book 1/i);
        expect(selectedBooks.length).toBe(1);

        expect(screen.getByText(/This book already exists!/i)).toBeInTheDocument();
    });

    it('displays error snackbar when a book is removed', () => {
        (searchBooks as jest.Mock).mockReturnValue([{ id: 1, summary: 'Test Summary 1' }]);

        render(<App />);
        const inputElement = screen.getByPlaceholderText(/Search books.../i) as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: 'Test' } });

        const suggestionElement = screen.getByText(/Test Book 1/i);
        fireEvent.click(suggestionElement);

        const removeButton = screen.getByRole('remove');
        fireEvent.click(removeButton);

        expect(screen.getByText(/Book removed!/i)).toBeInTheDocument();
    });

    it('hides snackbar when close button is clicked', () => {
        (searchBooks as jest.Mock).mockReturnValue([{ id: 1, summary: 'Test Summary 1' }]);

        render(<App />);
        const inputElement = screen.getByPlaceholderText(/Search books.../i) as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: 'Test' } });

        const suggestionElement = screen.getByText(/Test Book 1/i);
        fireEvent.click(suggestionElement);

        const closeButton = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeButton);

        expect(screen.queryByText(/Book added!/i)).not.toBeInTheDocument();
    });
});
