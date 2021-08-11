import React, { ReactElement } from 'react';
import { Link } from "react-router-dom";
import BookModel from '../../../models/Book';

interface Props {
    book: BookModel
}

export default function BookListItem(props: Props): ReactElement {
    const book = props.book

    return (

        <Link to={`/react-kurs/books/${book.isbn}`} className="item ui raised padded container segment" key={book.isbn}>
            <img className="ui tiny image" alt={book.title} src={book.thumbnails && book.thumbnails.length > 0 ? book.thumbnails[0].url : ''} />
            <div className="content">
                <div className="header">{book.title}</div>
                <div className="description">{book.subtitle}</div>
                <div className="metadata">
                    {book.authors.map((author, index) =>
                        <span id={"metadata " + author} key={index}>
                            {author}
                            {index !== book.authors.length - 1 && ', '}
                        </span>
                    )}
                    <br />
                    ISBN {book.isbn}
                </div>
            </div>
        </Link >

    )
}
