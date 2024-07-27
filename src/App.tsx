import React, { useState } from 'react';
import SearchAutocomplete from './components/SearchAutocomplete';
import BookCard from './components/BookCard';
import './App.css';
import Snackbar from './components/Snackbar/Snackbar';
import { Book } from './models/DataTypes';

const App: React.FC = () => {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [successOrError, setSuccessOrError] = useState<'success' | 'error' | ''>('');
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  // Method to handle book selection
  const handleSelect = (book: Book) => {
    const bookExists = selectedBooks.some(selectedBook => selectedBook.id === book.id);

    if (bookExists) {
      setShowSnackbar(true);
      setSuccessOrError('error');
      setSnackbarMessage('This book already exists!');
    } else {
      setSelectedBooks([...selectedBooks, book]);
      setShowSnackbar(true);
      setSuccessOrError('success');
      setSnackbarMessage('Book added!');
    }

  };

  // Method to handle book removal
  const handleRemove = (bookId: number) => {
    setSelectedBooks(selectedBooks.filter((item) => bookId !== item.id));
    setShowSnackbar(true);
    setSuccessOrError('error');
    setSnackbarMessage('Book removed!');
  }

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <div className="App">
      <h1 role='heading'>Autocomplete Search</h1>
      <div className="autocomplete-search-box">
        <SearchAutocomplete onSelect={handleSelect} />
      </div>

      {selectedBooks.length > 0 ?
        <div className="book-grid-container">
          {selectedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onRemove={() => handleRemove(book.id)}
            />
          ))}
        </div> :
        (
          <div className='no-results-text'>No books have been added yet</div>
        )
      }

      {showSnackbar &&
        <Snackbar
          message={snackbarMessage}
          onClose={handleCloseSnackbar}
          type={successOrError}
        />
      }
    </div>
  );
};

export default App;
