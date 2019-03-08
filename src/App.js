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
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.updateShelfs(books)
        this.setState(() => ({
          books
        }))
      })
  
  }

  updateBookShelf = (title, shelf) => {
    this.state.books.map((book) => {
      if (book.title === title) {
        book.shelf = shelf;
        BooksAPI.update(book, shelf);
      }
    })
    // this.setState((prevState) => {
    //   books: prevState.books.push(book)
    // })
    // console.log(this.state)
    this.updateShelfs(this.state.books)
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

  // updateBooks = () => {
  //   for (let index = 0; index < array.length; index++) {
  //     const element = array[index];

  //   }
  // }

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
                <CurrentlyReading currentlyReading={this.state.currentlyReading} updateBookShelf={this.updateBookShelf}/>
                <WantToRead wantToRead={this.state.wantToRead} updateBookShelf={this.updateBookShelf}/>
                <Read read={this.state.read} updateBookShelf={this.updateBookShelf}/>
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
