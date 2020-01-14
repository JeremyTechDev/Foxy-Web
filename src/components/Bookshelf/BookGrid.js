import React from "react";
import FindBook from "./findBook";

//The space where all the books are displayed
//Goes throught all the books in the "books" array
export default class BooksGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      findBook_Display: false //shown or hidden form
    };

    this.displayRate = this.displayRate.bind(this);
  }

  //shows or hides the form
  toogleDisplay(key) {
    this.setState({ [key]: !this.state[key] });
  }

  displayRate(rate) {
    //get num of yellow and gray stars and displays
    let yellowStars = rate;
    let grayStars = 5 - rate;

    yellowStars = "★".repeat(yellowStars);
    grayStars = "★".repeat(grayStars);

    return (
      <h3 className="book-rate">
        {yellowStars}
        <span>{grayStars}</span>
      </h3>
    );
  }

  render() {
    const {findBook_Display} = this.state;
    return (
      <React.Fragment>
        <button
          onClick={() => this.toogleDisplay("findBook_Display")}
          className="btn-add-book"
        >
          ADD A BOOK TO YOUR BOOKSHELF
        </button>
        <div className="books" id="books">
          {this.props.books.map(book => {
            const { title, authors, img, categories, rate } = book;

            return (
              <div className="book-container">
                <img alt="Book Cover" className="book-img" src={img} />
                <div className="book-info">
                  <h6 className="book-category">{categories}</h6>
                  <h2 className="book-title">{title}</h2>
                  <h5 className="book-author">by {authors}</h5>
                  {this.displayRate(rate)}
                </div>
              </div>
            );
          })}
        </div>

        {findBook_Display && (
          <FindBook
            user={this.props.user}
            toogleDisplay={() => this.toogleDisplay("findBook_Display")}
          />
        )}
      </React.Fragment>
    );
  }
}
