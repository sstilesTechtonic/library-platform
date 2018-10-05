// (function() {
//   var instance;
//   Library = function() {
//     if (instance) {
//       return instance;
//     }
//     instance = this;
//     this.bookShelf = new Array()
//   }
// })();

// The above is the function for making this a singleton. I wasn't able to get the
// singleton to sync up with the localStorage on the console though so I decided
// to comment it out. I was able to get the singleton to run on the engine.js and console.

function Library() {
  this.bookShelf = new Array()
}

Library.prototype.addBook = function(book) {
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (this.bookShelf[i].title === book.title) {
      return false;
    }
  }
  this.bookShelf.push(book);
  return true;
};

Library.prototype.removeBookByTitle = function(title) {
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (this.bookShelf[i].title === title) {
      this.bookShelf.splice(i, 1);
      return true;
    }
  }
  return false
};
Library.prototype.removeBookByAuthor = function(authorName) {
  for (var i = 0; i < this.bookShelf.length; i++) {
    if (this.bookShelf[i].author === authorName) {
      this.bookShelf.splice(i, 1);
      return true;
    }
  }
  return false
};

Library.prototype.getRandomBook = function() {
  var random = this.bookShelf[Math.floor(Math.random() * this.bookShelf.length)];
  if (this.bookShelf.length > 0) {
    return random;
  } else if (this.bookShelf.length === 0) {
    return null;
  };
};

Library.prototype.getBookByTitle = function(title) {

  var titleArray = this.bookShelf.filter(function(item) {
    return item.title.toLowerCase().indexOf(title) > -1;
  });
  return titleArray;
};

Library.prototype.getBookByAuthor = function(authorName) {

  var authorNameArray = this.bookShelf.filter(function(item) {
    return item.author.toLowerCase().indexOf(authorName) > -1;
  });
  return authorNameArray;
};

Library.prototype.addBooks = function(books) {
  var addMultipleBooks = 0;
  for (var i = 0; i < books.length; i++) {
    if (this.addBook(books[i]));
    addMultipleBooks++;
  }
  return addMultipleBooks;
};

Library.prototype.getAuthors = function() {

  var result = this.bookShelf.map(function(bookShelf) {
    return bookShelf.author
  });
  result = result.filter(function(a, i) {
    return result.indexOf(a) == i
  });
  return result;
};

Library.prototype.getRandomAuthorName = function() {

  var rAuthor = this.bookShelf[Math.floor(Math.random() * this.bookShelf.length)];
  if (this.bookShelf.length > 0) {
    return rAuthor.author;
  } else if (this.bookShelf.length === 0) {
    return null;
  };
};



Library.prototype.saveJsonLibrary = function() {
  localStorage.setItem("stringifyLibrary", JSON.stringify(this.bookShelf));
};

Library.prototype.jsonLibraryLoad = function() {
  this.bookShelf = JSON.parse(localStorage.getItem("stringifyLibrary"));
  for (var i = 0; i < this.bookShelf.length; i++) {
    this.bookShelf[i] = new Book(this.bookShelf[i].title,
      this.bookShelf[i].author,
      this.bookShelf[i].numberOfPages,
      this.bookShelf[i].publishDate,
    );
  }
};

document.addEventListener("DOMContentLoaded", function(e) {

  window.gLibrary = new Library();
});