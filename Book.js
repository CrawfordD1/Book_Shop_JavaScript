var Book = function(title, author, genre, price, pagecount){
  this.author = author;
  this.title = title;
  this.genre = genre;
  this.price = price;
  this.pagecount = pagecount;
}

Book.prototype = {
  details: function(){
    return ("Title: " + this.title + " | Author: " + this.author + " | Genre: " + this.genre + " | Pages: " + this.pagecount + " | Price: £" + this.price);
  }
}

module.exports = Book;