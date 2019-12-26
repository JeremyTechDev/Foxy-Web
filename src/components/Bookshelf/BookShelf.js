import React from "react";
import FindBook from "./findBook";
import BooksGrid from "./BookGrid";
import Sidebar from "../sidebar";
import { PostData } from "../../services/PostData";
import "../../css/books.scss";

export default class Bookshelf extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [], //Already displayed books
      error: null, //Error message
      findBook_Display: false //decides if display findBook
    };

    this.toogleDisplay = this.toogleDisplay.bind(this);
  }
  /*
  //Adds a new book for the user and re renders
  handleSubmit = book => {
    //Add the new book to the books state
    this.setState({
      books: [...this.state.books, book]
    });
    //Closes and cleans findBook form
    this.toogleDisplay("findBook_Display");
  };
  */
  //Shows or hides the key form component
  toogleDisplay(key) {
    this.setState({ [key]: !this.state[key] });
  }

  //Looks up for all books in the DB and store it in the state array
  componentDidMount() {
    PostData("selectAllBooks", {}).then(res => {
      res.allBooks.forEach(book => {
        this.setState({
          books: [...this.state.books, book]
        });
      });
    });
  }

  render() {
    const { books, error, findBook_Display } = this.state;

    return (
      <React.Fragment>
        <Sidebar title="Bookshelf" />

        {error && <h4>{error}</h4>}

        {/*All the user books on cotainers*/}
        <BooksGrid books={books} />

        {/*Button to display findBook*/}
        {!findBook_Display && (
          <button
            onClick={() => this.toogleDisplay("findBook_Display")}
            className="btn-toggle-AddBook btn"
          >
            Add a book
          </button>
        )}

        {/*findBook form*/}
        {findBook_Display && (
          <FindBook
            onSubmit={book => this.handleSubmit(book)}
            toogleDisplay={() => this.toogleDisplay("findBook_Display")}
          />
        )}
      </React.Fragment>
    );
  }
}
