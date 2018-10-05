function Book(title, author, numberOfPages, publishDate) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.publishDate = new Date(publishDate.toString());
};


Book.prototype.editBook = function(oBook) {

  if (oBook.hasOwnProperty('title')) {
    this.title = oBook.title;
  }
  if (oBook.hasOwnProperty('author')) {
    this.author = oBook.author;
  }
  if (oBook.hasOwnProperty('numberOfPages')) {
    this.numberOfPages = oBook.numberOfPages;
  }
  return oBook;
}