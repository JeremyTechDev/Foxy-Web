//Finds a given book in the google api and returns the result
export function searchBook(book, lan = "en") {
  const endpoint = window.encodeURI(
    `https://www.googleapis.com/books/v1/volumes?q='${book}'&langRestrict=${lan}`
  );

  return fetch(endpoint)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        throw new Error(data.message);
      }

       //return the three first books of the API result
       let returnItem = [];
       for (let i = 0; i < 3; i++) {
         let book = data.items[i].volumeInfo;
         returnItem.push({
           title: book.title,
           authors: book.authors.join(", "),
           categories: book.categories,
           rating: null,
           image: book.imageLinks.thumbnail ,
           //isbn: book.industryIdentifiers[0].identifier
         });
       }
       return returnItem;
    });
}
