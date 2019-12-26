import React from "react";

//The space where all the books are displayed
//Goes throught all the books in the "books" array
export default class BooksGrid extends React.Component {
  constructor(props) {
    super(props);

    this.displayRate = this.displayRate.bind(this);
  }

  displayRate(rate) {
    //get num of yellow and gray stars
    let yellowStars = rate;
    let grayStars = 5 - rate;
    
    yellowStars = "★".repeat(yellowStars)
    grayStars = "★".repeat(grayStars)

    return (
      <h3 className="book-rate">
        {yellowStars}
        <span>{grayStars}</span>
      </h3>
    );
  }

  render() {
    return (
      <div className="books" id="books">
        {this.props.books.map(book => {
          const {
            title,
            authors,
            publishedDate,
            img,
            categories,
            rate
          } = book;

          return (
            <div className="book-container">
              <img alt="Book Cover" className="book-img" src={img} />
              <div className="book-info">
                <h6 className="book-category">
                  {categories}
                  <span className="book-release">{publishedDate}</span>
                </h6>
                <h2 className="book-title">{title}</h2>
                <h5 className="book-author">by {authors}</h5>
                {this.displayRate(rate)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
