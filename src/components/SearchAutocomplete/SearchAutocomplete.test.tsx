import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchAutocomplete from './SearchAutocomplete';
import { searchBooks } from '../../utils/Search';

// Mock the searchBooks function and data module
vi.mock('../../utils/Search', () => ({
    searchBooks: vi.fn(),
}));

vi.mock('../../data/Data', () => ({
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

describe('SearchAutocomplete', () => {
    const mockOnSelect = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('renders search input', () => {
        render(<SearchAutocomplete onSelect={mockOnSelect} />);
        const inputElement = screen.getByPlaceholderText(/Search books.../i);
        expect(inputElement).toBeInTheDocument();
    });

    it('updates input value and shows suggestions', () => {
        (searchBooks as jest.Mock).mockReturnValue([{ id: 1, summary: 'Test Summary 1' }]);

        render(<SearchAutocomplete onSelect={mockOnSelect} />);
        const inputElement = screen.getByPlaceholderText(/Search books.../i) as HTMLInputElement;

        fireEvent.change(inputElement, { target: { value: 'Test' } });

        expect(inputElement.value).toBe('Test');
        expect(searchBooks).toHaveBeenCalledWith('Test');

        const suggestionElement = screen.getByText(/Test Book 1/i);
        expect(suggestionElement).toBeInTheDocument();
    });

    it('selects a suggestion and calls onSelect', () => {
        (searchBooks as jest.Mock).mockReturnValue([{ id: 1, summary: 'Test Summary 1' }]);

        render(<SearchAutocomplete onSelect={mockOnSelect} />);
        const inputElement = screen.getByPlaceholderText(/Search books.../i);

        fireEvent.change(inputElement, { target: { value: 'Test' } });

        const suggestionElement = screen.getByText(/Test Book 1/i);
        fireEvent.click(suggestionElement);

        expect(mockOnSelect).toHaveBeenCalledWith({
            id: 1,
            title: 'Test Book 1',
            summary: 'Test Summary 1',
            author: 'Author 1'
        });
    });

    it('submits form and selects first suggestion', () => {
        (searchBooks as jest.Mock).mockReturnValue([{ id: 1, summary: 'Test Summary 1' }]);

        render(<SearchAutocomplete onSelect={mockOnSelect} />);
        const inputElement = screen.getByPlaceholderText(/Search books.../i);

        fireEvent.change(inputElement, { target: { value: 'Test' } });

        const formElement = screen.getByRole('form');
        fireEvent.submit(formElement);

        expect(mockOnSelect).toHaveBeenCalledWith({
            id: 1,
            title: 'Test Book 1',
            summary: 'Test Summary 1',
            author: 'Author 1'
        });
    });
});
