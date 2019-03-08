import React, { Component } from 'react'

class WantToRead extends Component {

  changeBookShelf = (event, book) => {
    let shelf = event.target.value;
    let title = book.title;
    this.props.updateBookShelf(title, shelf)
  }

  render() {
    const { wantToRead } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
            {wantToRead.length > 0 && (wantToRead.map((book, i) => (
              <li key={i}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(event) => this.changeBookShelf(event, book)}>
                        <option value="none" >Move to...</option>
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
                    {book.authors.map((author, i) => (
                      <p key={i}>{author}</p>
                    ))}
                  </div>
                </div>
              </li>
            )))}
          </ol>
        </div>
      </div>

    );

  }

}

export default WantToRead;

