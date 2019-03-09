import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    query: '',
    showingBooks: [],
  }

  updateQuery = (query) => {
    // query = query.trim();

    this.setState(() => ({
      query: query
    }))

    this.search(query)
  }

  search = (query) => {
    BooksAPI.search(query)
      .then((showingBooks) => {
        if (showingBooks !== undefined) {
          showingBooks.error
            ? this.setState({ showingBooks: [] })
            :
            this.setState(() => ({
              showingBooks
            }))
        }
        else {
          this.setState({ showingBooks: [] })
        }
      })
  }

  changeBookShelf = (event, book) => {
    let shelf = event.target.value;
    let id = book.id;
    this.props.updateBookShelf(id, shelf)
  }

  refreshState() {

  }
  render() {

    const { query, showingBooks } = this.state
    const { books } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book, i) => {
              for (let index = 0; index < books.length; index++) {
                books[index].title === book.title && (book.shelf = books[index].shelf)
              }
              return (
                <li key={i}>
                  <div className="book">
                    <div className="book-top">
                      {book.imageLinks &&
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      }
                      <div className="book-shelf-changer">
                        <select onChange={(event) => this.changeBookShelf(event, book)} value={book.shelf ? book.shelf : "none"}>
                          <option disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className='book-title'>
                      {book.title}
                    </div>
                    <div className='book-authors'>
                      {book.authors}
                      {/* {book.authors.map((author, i) => (
                      <p key={i}>{author}</p>
                    ))} */}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    );

  }

}

export default Search;