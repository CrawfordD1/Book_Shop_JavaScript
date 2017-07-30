var _ = require("lodash");

var Customer = function(name){
  this.name = name;
  this.collection = [];
  this.cash = 100;
}

Customer.prototype = {
  findIndexByTitle: function(title){
    return _.findIndex(this.collection, function(book){
     return book.title === title;
    })
  },
  buy: function(book){
    this.cash -= book.price;
    this.collection.push(book);
  },
  sell: function(title, bookstore){
   var index = this.findIndexByTitle(title);
   var book = this.collection[index]
   this.cash += book.price;
   bookstore.buy(_.pullAt(this.collection, index));
  },
  viewGenre: function(genre){
   return _.filter(this.collection, function(book){
     return book.genre === genre;
   });
  },
  genreValue: function(genre){
    var total = 0;
    _.forEach(this.viewGenre(genre), function(book){
      total += book.price;
    })
    return total;
  },
  collectionValue: function(){
    var total = 0;
    _.forEach(this.collection, function(book){
      total += book.price;
    })
    return total;
  },
  longestBook: function(){
    var highestBook = this.collection[0];
    _.forEach(this.collection, function(book){
      if(book.pagecount > highestBook.pagecount){
        highestBook = book;
      }
    })
    return highestBook;
  },
  sort: function(type){
    this.collection = _.sortBy(this.collection, type);
  },
  compareCustomerValues: function(customer2){
    var value1 = this.collectionValue();
    var value2 = customer2.collectionValue();
    return (value1 > value2) ? value1-value2 : value2-value1;
  }
}


module.exports = Customer;