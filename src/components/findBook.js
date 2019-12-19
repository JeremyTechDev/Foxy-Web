import React from "react";
import { searchBook } from "../api/api";

class ShowErrorOnRating extends React.Component {
  render() {
    return <p style={{ color: "red" }}>Please insert your rating.</p>;
  }
}

//Show form to find book online by name or ISBN
//PARAMETHERS: toogleFrom to close form & onSubmit to send input value to default class
export default class FindBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: {
        //all data needed of the book
        title: null,
        authors: [],
        categories: null,
        image: require("../images/cover.png"),
        isbn: null,
        rating: null
      },
      displaySearchOnline: false, //decides to show online search with api
      showErrorOnRating: false
    };

    this.toogle_Display = this.toogle_Display.bind(this);
  }

  setRating(rate) {
    this.setState({
      book: {
        ...this.state.book,
        rating: rate
      }
    });
  }

  toogle_Display() {
    const { displaySearchOnline } = this.state;
    this.setState({ displaySearchOnline: !displaySearchOnline });
  }

  //runs when user search a book online after submiting
  handleSearch = () => {
    searchBook(this.state.book.title).then(data => {
      this.setState({ book: data });
    });

    this.toogle_Display();
  };

  //runs when user submit the main form
  handleSubmit = event => {
    event.preventDefault();

    //If user has not rated the book, show error message and cancel submit
    if (this.state.book.rating === null) {
      this.setState({ showErrorOnRating: !this.state.showErrorOnRating });
      return false;
    } else {
      this.props.onSubmit(this.state.book);
    }
  };

  //runs everytime user changes any input file
  handleChange = key => event => {
    //when the key is authors, it needs to be inside an array
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
    const { displaySearchOnline, showErrorOnRating } = this.state;

    return (
      <div className="form-AddBook">
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

            <img
              className="img-addBook"
              src={this.state.book.image}
              alt="Book Cover"
            />

            {showErrorOnRating && <ShowErrorOnRating />}

            <input
              className="inp"
              autoComplete="off"
              type="text"
              id="fssss"
              maxLength="100"
              placeholder="Title*"
              name="title"
              value={this.state.book.title}
              onChange={this.handleChange("title")}
              required
            />

            <input
              className="inp"
              autoComplete="off"
              type="text"
              placeholder="Author*"
              maxLength="50"
              name="authors"
              value={this.state.book.authors}
              onChange={this.handleChange("authors")}
              required
            />

            <input
              className="inp"
              autoComplete="off"
              type="text"
              maxLength="50"
              placeholder="Categories"
              name="categories"
              value={this.state.book.categories}
              onChange={this.handleChange("categories")}
            />

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
            >
              Add book
            </button>
          </form>
        )}

        {/*ONLINE SEARCH*/}
        {displaySearchOnline && (
          <form onSubmit={this.handleSearch}>
            <span className="a" onClick={this.toogle_Display}>
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
              className="btn-AddBook btn-Online btn"
              disabled={!this.state}
            >
              Add book
            </button>
          </form>
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
