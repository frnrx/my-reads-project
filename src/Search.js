import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Search extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  changeBookShelf = (event, book) => {
    let shelf = event.target.value;
    let title = book.title;
    this.props.updateBookShelf(title, shelf)
  }

  render() {

    const { query } = this.state
    const { books } = this.props

    const showingBooks = query === ''
      ? books
      : books.filter((c) => {

        let authorExists = false

        for (let index = 0; index < c.authors.length; index++) {
          if (c.authors[index].toLowerCase().includes(query.toLowerCase())) {
            authorExists = true
          }
        }

        let titleExist = c.title.toLowerCase().includes(query.toLowerCase())

        return (
          titleExist || authorExists
        )
      })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
            {showingBooks.map((book, i) => (
              <li key={i}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                      </select>
                    </div>
                  </div>
                  <div className='book-title'>
                    {book.title}
                  </div>
                  <div className='book-authors'>
                    {book.authors.map((author, i) => (
                      <p key={i}>{author}</p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );

  }

}

export default Search;