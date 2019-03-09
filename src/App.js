import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books: books })
        this.updateShelfs(books)
      })
  }

  componentDidUpdate() {
    BooksAPI.getAll()
      .then((books) => (this.updateShelfs(books)))
  }

  updateBookShelf = (id, shelf) => {
    BooksAPI.get(id)
      .then((book) => {
        book.shelf = shelf
        BooksAPI.update(book, shelf)
        this.updateShelfs(this.state.books)
      })
  }


  updateShelfs = (books) => {
    let currentlyReadingBooks = books.filter(book => book.shelf === 'currentlyReading')
    this.setState({
      currentlyReading: currentlyReadingBooks
    })

    let wantToReadBooks = books.filter(book => book.shelf === 'wantToRead')
    this.setState({
      wantToRead: wantToReadBooks
    })

    let readBooks = books.filter(book => book.shelf === 'read')
    this.setState({
      read: readBooks
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search books={this.state.books} updateBookShelf={this.updateBookShelf} />
        )} />
        <Route to exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReading currentlyReading={this.state.currentlyReading} updateBookShelf={this.updateBookShelf} />
                <WantToRead wantToRead={this.state.wantToRead} updateBookShelf={this.updateBookShelf} />
                <Read read={this.state.read} updateBookShelf={this.updateBookShelf} />
              </div>
            </div>
            <Link className="open-search" to='/search'>Add a book</Link>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
