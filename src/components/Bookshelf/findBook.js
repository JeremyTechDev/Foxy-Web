import React from "react";
import { searchBook } from "../../api/api";
import * as Store from "../../store";

//If no rating when submit, show this error
class ShowErrorOnRating extends React.Component {
  render() {
    return <p style={{ color: "red" }}>Please insert your rating.</p>;
  }
}

//Displays three book result of the user's search in small box,
//The user then chooses one of them with click
class BookBox extends React.Component {
  render() {
    const { booksSearchedOnline } = this.props; //3 api result books
    return booksSearchedOnline.map(book => {
      return (
        <button
          onClick={() => {
            this.props.handleBookChoice(book);
          }}
          className="book-box"
        >
          <div className="book-box">
            <div className="book-box-img">
              <img alt="" src={book.image} />
            </div>

            <div className="book-box-info">
              <h4>{book.title}</h4>
              <h5 className="box-author">by {book.authors}</h5>
            </div>
          </div>
        </button>
      );
    });
  }
}

//Show form to find book online by name or ISBN
//PARAMETHERS: toogleFrom to close form & onSubmit to send input value to default class
export default class FindBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: { user: this.props.user }, //starts with the user info
      booksSearchedOnline: [],
      displaySearchOnline: true, //decides to show online search with api
      showErrorOnRating: false
    };

    this.toogle_Display = this.toogle_Display.bind(this);
    this.handleBookChoice = this.handleBookChoice.bind(this);
  }

  //set the given rating to the book
  setRating(rate) {
    this.setState({
      book: {
        ...this.state.book,
        rating: rate
      }
    });

    //show the currenly stars highlighted
    const stars = document.getElementsByClassName("star");
    for (var i = 0; i < stars.length; i++) {
      stars[i].style.color = "gray";
    }
  }

  //Changes view between online search and manually add the book
  toogle_Display() {
    const { displaySearchOnline } = this.state;
    this.setState({ displaySearchOnline: !displaySearchOnline });
  }

  //set the book chose by the user un the book key state
  handleBookChoice(choice) {
    this.setState({
      book: { ...this.state.book, ...choice }
    });

    this.toogle_Display(); //change display form
  }

  //runs when user search a book online after submiting
  handleSearch = () => {
    //Searchs the book and store data on state
    searchBook(this.state.book.title).then(data => {
      this.setState({ booksSearchedOnline: data });
    }).catch(() => {
      alert("No books found, try another one.")
    });
  };

  //runs when user submit the main form
  handleSubmit = event => {
    event.preventDefault();

    //If user has not rated the book, show error message and cancel submit
    if (this.state.book.rating === null) {
      this.setState({ showErrorOnRating: !this.state.showErrorOnRating });
      return false;
    } else {
      Store.store.dispatch(Store.addBookAction(this.state.book));
    }
  };

  //runs everytime user changes any input file
  handleChange = key => event => {
    this.setState({
      book: {
        ...this.state.book,
        [key]: event.target.value
      }
    });
  };

  render() {
    const {
      book,
      displaySearchOnline,
      showErrorOnRating,
      booksSearchedOnline
    } = this.state;

    return (
      <div className="form-AddBook corner-popup">
        <h2>SEARCH A BOOK</h2>

        {/*MANUALLY ADDED (default)*/}
        {!displaySearchOnline && (
          <form onSubmit={this.handleSubmit}>
            <button className="btn-SearchAgain" onClick={this.toogle_Display}>
              Search another book
            </button>

            <img
              className="img-addBook"
              src={this.state.book.image}
              alt="Book Cover"
            />

            {showErrorOnRating && <ShowErrorOnRating />}

            <div className="div-label">
              <input className="inp" value={book.title} disabled />
              <label>Title</label>
            </div>

            <div className="div-label">
              <input className="inp" value={book.authors} disabled />
              <label>Author</label>
            </div>

            <div className="div-label">
              <input className="inp" value={book.categories} disabled />
              <label>Categories</label>
            </div>

            <h3 className="h3-rating">Rating:</h3>
            <div className="rating">
              <button
                type="button"
                onClick={() => this.setRating(5)}
                className="star star1"
              >
                &#9733;
              </button>
              <button
                type="button"
                onClick={() => this.setRating(4)}
                className="star star2"
              >
                &#9733;
              </button>
              <button
                type="button"
                onClick={() => this.setRating(3)}
                className="star star3"
              >
                &#9733;
              </button>
              <button
                type="button"
                onClick={() => this.setRating(2)}
                className="star star4"
              >
                &#9733;
              </button>
              <button
                type="button"
                onClick={() => this.setRating(1)}
                className="star star5"
              >
                &#9733;
              </button>
            </div>

            <button
              type="submit"
              className="btn-AddBook btn"
              disabled={!this.state.book}
              onClick={this.handleSubmit}
            >
              Add book
            </button>
          </form>
        )}

        {/*ONLINE SEARCH*/}
        {displaySearchOnline && (
          <React.Fragment>
            <input
              className="inp"
              autoComplete="off"
              type="text"
              placeholder="Search by title or ISBN"
              name="title"
              value={this.state.title}
              onChange={this.handleChange("title")}
            />

            <button
              type="button"
              className="btn-SearchBook btn"
              disabled={!this.state.book.title}
              onClick={this.handleSearch}
            >
              Search book
            </button>

            {booksSearchedOnline.length !== 0 && (
              <BookBox
                booksSearchedOnline={booksSearchedOnline}
                handleBookChoice={this.handleBookChoice}
              />
            )}
          </React.Fragment>
        )}

        <button
          className="btn-toggle-AddBook btn"
          onClick={() => this.props.toogleDisplay("findBook_Display")}
        >
          Close
        </button>
      </div>
    );
  }
}
