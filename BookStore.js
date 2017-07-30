var _ = require("lodash");

var BookStore = function(name, city){
  this.name = name;
  this.city = city;
  this.inventory =  [];
  this.balance = 1000;
}

BookStore.prototype = {
 add: function(book){
    this.inventory.push(book);
 },
 findIndexByTitle: function(title){
   return _.findIndex(this.inventory, function(book){
    return book.title === title;
   })
 },
 sell: function(title, customer){
  var index = this.findIndexByTitle(title);
  var book = this.inventory[index]
  if(customer.cash >= book.price){
    this.balance += book.price;
    _.pullAt(this.inventory, index)
    customer.buy(book);
  }
 },
 inventoryValue: function(){
  var total = 0;
  _.forEach(this.inventory, function(book){
    total += book.price;
  })
  return total;
 },
 financials: function(){
  return ("Balance: " + this.balance + " | Total Stock Value: " + this.inventoryValue());
 },
 viewGenre: function(genre){
  return _.filter(this.inventory, function(book){
    return book.genre === genre;
  });
 },
 buy: function(book){
  this.add(book);
  this.balance -= book.price;
 }
}


module.exports = BookStore;








