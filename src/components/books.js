import React from "react";
import { searchBook } from "../api/api";

//Title and short description of the page
function Header() {
  return (
    <div className="header">
      <h1>Add the books you've read here</h1>
    </div>
  );
}

//The space where all the books are displayed
//Goes throught all the books in the "books" array
function BooksGrid({ books }) {
  return (
    <div className="books">
      {books.map(book => {
        const { title, authors, publishedDate, image, categories } = book;

        return (
          <div className="book-container">
            <img alt="Book Cover" className="book-img" src={image} />
            <div className="book-info">
              <h6 className="book-category">
                {categories}
                <span className="book-release">{publishedDate}</span>
              </h6>
              <h2 className="book-title">{title}</h2>
              <h5 className="book-author">by {authors.join(", ")}</h5>
            </div>
          </div>
        );
      })}
    </div>
  );
}

//Show form to find book online by name or ISBN
//PARAMETHERS: toogleFrom to close form & onSubmit to send input value to default class
class FindBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: { //all data needed of the book
        title: null,
        authors: [],
        pages: null,
        categories: null,
        image: "../../images/harry potter and the camber of secrets.jpg",
        isbn: null
      },
      displaySearchOnline: false //decides to show online search with api
    };

    this.toogle_Display = this.toogle_Display.bind(this);
  }

  toogle_Display() {
    const { displaySearchOnline } = this.state;
    this.setState({ displaySearchOnline: !displaySearchOnline });
  }

  handleSubmit = event => {
    event.preventDefault();
    //if categories is null it means that the search was online
    //so only the book title or isbn is needed
    if (this.state.book.categories === null) {
      this.props.onSubmit(this.state.book.title);
    } else {
      this.props.onSubmit(this.state.book);
    }
  };
  
  //when the key is authors, it needs to be inside an array
  handleChange = key => event => {
    if (key === "authors") {
      this.setState({
        book: {
          ...this.state.book,
          authors: [event.target.value]
        }
      });
    } else {
      this.setState({
        book: {
          ...this.state.book,
          [key]: event.target.value
        }
      });
    }
  };

  render() {
    const { displaySearchOnline } = this.state;

    return (
      <div class="form-AddBook">
        <h2>ADD A BOOK</h2>

        {/*MANUALLY ADDED (default)*/}
        {!displaySearchOnline && (
          <form onSubmit={this.handleSubmit}>
            <button
              type="button"
              className="btn-searchOnline btn"
              onClick={this.toogle_Display}
            >
              Search Online
            </button>
            <br />

            <h4>or</h4>
            <input
              className="inp"
              autoComplete="off"
              type="text"
              placeholder="Title*"
              name="title"
              value={this.state.title}
              onChange={this.handleChange("title")}
              required
            />

            <input
              className="inp"
              autoComplete="off"
              type="text"
              placeholder="Author*"
              name="authors"
              value={this.state.authors}
              onChange={this.handleChange("authors")}
              required
            />

            <input
              className="inp"
              autoComplete="off"
              type="number"
              placeholder="Pages"
              name="pages"
              value={this.state.pages}
              onChange={this.handleChange("pages")}
              required
            />

            <input
              className="inp"
              autoComplete="off"
              type="text"
              placeholder="Categorires"
              name="categoties"
              value={this.state.categories}
              onChange={this.handleChange("categories")}
              required
            />

            <button
              type="submit"
              class="btn-AddBook btn"
              disabled={!this.state}
            >
              Add book
            </button>
          </form>
        )}

        {/*ONLINE SEARCH*/}
        {displaySearchOnline && (
          <form onSubmit={this.handleSubmit}>
            <span className="a" href="" onClick={this.toogle_Display}>
              Go back to Add Book manually
            </span>

            <input
              className="inp"
              autoComplete="off"
              type="text"
              placeholder="Search by title or ISBN"
              name="title"
              value={this.state.title}
              onChange={this.handleChange("title")}
              required
            />

            <button
              type="submit"
              class="btn-AddBook btn"
              disabled={!this.state}
            >
              Add book
            </button>
          </form>
        )}

        <button
          className="btn-toggle-AddBook btn"
          onClick={this.props.toogle_findBook}
        >
          Close
        </button>
      </div>
    );
  }
}

function Loading() {
  return (
    <table className="center-text loading">
      <tr>
        <td>
          <img src={require("../images/loading.gif")} alt="" />
        </td>
      </tr>
    </table>
  );
}

export default class Books extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [], //Already displayed books
      error: null, //Error message
      findBook_Display: false //decides if display findBook
    };

    this.getBooks = this.getBooks.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.toogle_findBook = this.toogle_findBook.bind(this);
  }

  //Adds a new book for the user and re renders
  handleSubmit = book => {
    //if book is only and string, it need to search the book with an API
    if (typeof book === "string") {
      //search book with API
      this.getBooks(book);
    } else {
      //Adds the new book manually
      this.setState({
        books: [...this.state.books, book]
      });
    }

    //Closes and cleans findBook
    this.toogle_findBook();
  };

  //Shows and hides findBook
  toogle_findBook() {
    const { findBook_Display } = this.state;

    this.setState({ findBook_Display: !findBook_Display });
  }

  //Returns true if the page is still fetching books
  isLoading() {
    const { error, books } = this.state;

    if (error == null && books.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  //Gets a given book's data from the api 'searchBook' and saves it on the state
  getBooks(bookToSearch) {
    searchBook(bookToSearch)
      .then(data => {
        this.setState(({ books }) => ({
          books: [...books, data]
        }));
      })
      .catch(() => {
        this.setState({
          error: "There was an error fetching the books."
        });
      });
  }

  render() {
    const { books, error, findBook_Display } = this.state;

    return (
      <React.Fragment>
        {/*Header with the title of the page*/}
        <Header />

        {/*Loading and error message when occur*/}
        {this.isLoading() && <Loading />}
        {error && <h4>{error}</h4>}

        {/*All the user books on cotainers*/}
        <BooksGrid books={books} />

        {/*Button to display findBook*/}
        {!findBook_Display && (
          <button
            onClick={this.toogle_findBook}
            className="btn-toggle-AddBook btn"
          >
            Add a book
          </button>
        )}

        {/*findBook form*/}
        {findBook_Display && (
          <FindBook
            onSubmit={book => this.handleSubmit(book)}
            toogle_findBook={this.toogle_findBook}
          />
        )}
      </React.Fragment>
    );
  }
}
