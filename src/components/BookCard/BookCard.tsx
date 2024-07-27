import React from 'react';
import './BookCard.css';
import '../BookAuthorIcon'
import BookAuthorIcon from '../BookAuthorIcon';
import { RxCross2 } from 'react-icons/rx';
import { Book } from '../../models/DataTypes';

interface Props {
    book: Book;
    onRemove: () => void;
}

const BookCard: React.FC<Props> = ({ book, onRemove }) => {
    return (
        <div className="book-card">
            <div className='book-header'>
                <h3 className='book-title'>{book.title}</h3>
                <RxCross2
                    role='remove'
                    className='remove-icon'
                    onClick={() => onRemove()}
                />
            </div>
            <p className='book-summary'>{book.summary}</p>
            <div className='book-author'>
                <BookAuthorIcon />
                <strong>{book.author}</strong>
            </div>
        </div>
    );
}

export default BookCard;
