import React, { Component } from 'react'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import { Link } from 'react-router-dom'

class ListOfBooks extends Component {

  render() {
    
    console.log(this.state);

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <CurrentlyReading />
            <WantToRead />
            <Read />
          </div>
        </div>
        <Link className="open-search" to='/search'>Add a book</Link>
      </div>
    );
  }
}

export default ListOfBooks;