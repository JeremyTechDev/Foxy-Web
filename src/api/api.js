//Finds a given book in the google api and returns the result
export function searchBook (book, lan='en') {
    const endpoint = window.encodeURI(`https://www.googleapis.com/books/v1/volumes?q='${book}'&langRestrict=${lan}`)
  
    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) {
          throw new Error(data.message)
        }
        
        data = data.items[0].volumeInfo
        return {
          title: data.title,
          authors: data.authors,
          categories: data.categories,
          rating: null,
          image: data.imageLinks.thumbnail,
          isbn: data.industryIdentifiers[0].identifier
        }
      })
  }
