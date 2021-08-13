import React, { ReactElement, useState } from 'react'
import { Link } from 'react-router-dom'
import { bookApi, useBookApi } from '../../../hooks/BookApi'
import useComponentVisible from '../../../hooks/UseComponentVisible'
import BookModel from '../../../models/Book'
import LoadingSpinner from '../../loading-spinner/LoadingSpinner'

interface Props {
    className?: string
}

export default function BookSearch(props: Props): ReactElement {
    const [books, setBooks] = useState<BookModel[]>([])
    const [searchString, setSearchString] = useState<string>('')
    const [ref, isComponentVisible, setIsComponentVisible] = useComponentVisible();

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value)
        searchString.length > 0 && searchString != ' '
            && bookApi('GET', `/books/search/${searchString.trim()}`, setBooks)

    }

    const onClearList = () => {
        setIsComponentVisible(false)
        setSearchString('')
    }

    return (
        <div ref={ref} className={`ui search ${props.className}`}>
            <div className="ui icon input">
                <input type="text" className="prompt" value={searchString} onChange={onSearch} />
                <i className="search icon" />
            </div>
            {isComponentVisible &&

                <div className={`results transition ${books.length > 0 && 'visible'}`}>
                    {books.map((book, index) =>
                        <Link key={index} onClick={onClearList} className="result" to={`/books/${book.isbn}`}>
                            {book.title}
                            <p className="description">
                                {book.subtitle
                                    ? book.subtitle
                                    : ''}
                            </p>
                        </Link>
                    )}
                </div>

            }
        </div>
    )
}
