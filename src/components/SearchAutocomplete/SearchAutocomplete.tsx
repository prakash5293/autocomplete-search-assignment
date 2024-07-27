import React, { useState } from 'react';
import { searchBooks } from '../../utils/Search';
import { data } from '../../data/Data';
import './SearchAutocomplete.css'
import { Book, Summary } from '../../models/DataTypes';

interface Props {
    onSelect: (book: Book) => void;
}

const SearchAutocomplete: React.FC<Props> = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Summary[]>([]);

    // Handling input field value
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value) {
            const results = searchBooks(value);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    // Method to set book data on selection
    const handleSelect = (summary: Summary) => {
        const book = {
            id: summary.id,
            title: data.titles[summary.id],
            summary: summary.summary.replace('The Book in Three Sentences:', ''),
            author: data.authors.find(author => author.book_id === summary.id)?.author || 'Unknown'
        };
        onSelect(book);
        setQuery('');
        setSuggestions([]);
    };

    // Form submit
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (suggestions.length > 0) {
            handleSelect(suggestions[0]);
        }
    };

    return (
        <div className='autocomplete-search-container'>
            <form
                onSubmit={handleSubmit}
                className='search-input-form-container'
                role='form'
            >
                <div>
                    <label htmlFor="search-input">Search Books by Text</label>
                    <input
                        type="text"
                        id="search-input"
                        className='autocomplete-search-input'
                        value={query}
                        onChange={handleChange}
                        placeholder="Search books..."
                    />
                </div>
            </form>
            {suggestions.length > 0 && (
                <div className="search-suggestions-container">
                    <h4>Suggestions based on search input:</h4>
                    <div className="search-suggestions-list">
                        {suggestions.map((summary, index) => (
                            <span
                                key={summary.id}
                                id={summary.id.toString()}
                                onClick={() => handleSelect(summary)}
                                role={'select-book-' + index}
                            >
                                {data.titles[summary.id]}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAutocomplete;
