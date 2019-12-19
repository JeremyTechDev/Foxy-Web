import React from "react";
import FindBook from "./findBook";
import BooksGrid from "./BookGrid";
import Sidebar from "./sidebar";
import { searchBook } from "../api/api";

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
    this.toogleDisplay = this.toogleDisplay.bind(this);
  }

  //Shows and hides the sidebar
  updateSidebar = () => {
    let sidebar = document.getElementById("sidebar");
    let header = document.getElementById("header");
    let books = document.getElementById("books");
    let btnSidebar = document.getElementById("btn-sidebar");

    //if its hidden
    if (sidebar.style.left === "-20%") {
      //center all components
      sidebar.style.left = "0";
      header.style.marginLeft = "20%";
      books.style.marginLeft = "20%";
      btnSidebar.style.left = "20%";
    } else {
      sidebar.style.left = "-20%";
      header.style.marginLeft = "0";
      books.style.marginLeft = "auto";
      books.style.width = "100%";
      btnSidebar.style.left = "0";
    }
    //change class from light(hidden) to dark(shown)
    btnSidebar.classList.toggle("btn-sidebar-light");
  };

  //Adds a new book for the user and re renders
  handleSubmit = book => {
    //Add the new book to the books state
    this.setState({
      books: [...this.state.books, book]
    });
    //Closes and cleans findBook form
    this.toogleDisplay("findBook_Display");
  };

  //Shows or hides the key form
  toogleDisplay(key) {
    this.setState({ [key]: !this.state[key] });
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

  async componentDidMount() {
    fetch("/api/books")
      .then(res => res.json())
      .then(test => this.setState({test}, () => console.log("working...", test)));
  }

  render() {
    const { books, error, findBook_Display } = this.state;

    return (
      <React.Fragment>
        <Sidebar />
        {/*Header with the title of the page*/}
        <div className="header" id="header">
          <button
            className="btn-sidebar"
            id="btn-sidebar"
            onClick={this.updateSidebar}
          >
            <i class="fas fa-bars"></i>
          </button>
          <h1>Bookshelf</h1>
          {this.state.test}
        </div>

        {/*Loading and error message when occur*/}
        {this.isLoading() && <Loading />}
        {error && <h4>{error}</h4>}

        {/*All the user books on cotainers*/}
        <BooksGrid
          books={books}
          toogleDisplay={() => this.toogleDisplay("rateBook_Display")}
        />

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
