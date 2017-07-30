



var assert = require('assert');
var Book = require('../Book.js');
var BookStore = require('../BookStore.js');
var Customer = require('../Customer.js');

describe('Customer', function() {

  var bookstore;
  var lotr;
  var customer;

  beforeEach(function(){
    bookstore = new BookStore('Clyde','Glasgow');
    lotr = new Book('LOTR', "JRR", 'Fantasy', 10, 500);
    CITR= new Book('Coder in the Rye', "Craw", 'Factual', 50, 145);
    F451 = new Book('Farrenheit 451', "JRR", 'Sci-fi', 8, 256);
    Hobbit = new Book('The Hobbit', "JRR", 'Fantasy', 7, 300);
    Bible = new Book('The Bible', "Jesus", 'Fantasy', 13, 600);
    Expensive = new Book('TestExpensive', "Craw", 'Factual', 101, 6000);
    customer = new Customer("Craw");
    bookstore.add(lotr);
    bookstore.add(CITR);
    bookstore.add(F451);
    bookstore.add(Hobbit);
    bookstore.add(Bible);
  })

  it("should be able to buy a book", function(){
    bookstore.sell('The Hobbit', customer);
    assert.strictEqual(customer.cash, 93);
    assert.strictEqual(customer.collection.length, 1);
  })

  it("shouldnt be able to buy a book if no money", function(){
    bookstore.add(Expensive);
    bookstore.sell('TestExpensive', customer);
    assert.strictEqual(customer.cash, 100);
    assert.strictEqual(customer.collection.length, 0);
  })

  it("should be able to sell a book", function(){
    bookstore.sell('The Hobbit', customer);
    customer.sell("The Hobbit", bookstore)
    assert.strictEqual(customer.cash, 100);
    assert.strictEqual(customer.collection.length, 0);
    assert.strictEqual(bookstore.inventory.length, 5);
  })

  it("should be able to buy a book", function(){
    bookstore.sell('The Hobbit', customer);
    assert.strictEqual(customer.cash, 93);
    assert.strictEqual(customer.collection.length, 1);
  })

  it("should be able to view the total value of their collection", function(){
    bookstore.sell('The Hobbit', customer);
    bookstore.sell('Farrenheit 451', customer);
    assert.strictEqual(customer.collectionValue(), 15);
  })

  it("should be able to view the total value of all books of a given Genre", function(){
    bookstore.sell('The Hobbit', customer);
    bookstore.sell('Farrenheit 451', customer);
    assert.strictEqual(customer.genreValue('Fantasy'), 7);
  })

  it("should be able to view their longest book.", function(){
    bookstore.sell('The Hobbit', customer);
    bookstore.sell('Farrenheit 451', customer);
    assert.strictEqual(customer.longestBook(), Hobbit);
  })

  it("should be able to sort their books by value. (ascending or descending)", function(){
    bookstore.sell('Coder in the Rye', customer);
    bookstore.sell('The Hobbit', customer);
    bookstore.sell('Farrenheit 451', customer);
    customer.sort('price')
    assert.deepEqual(customer.collection, [Hobbit, F451, CITR] );
  })

  it("should be able to compare the value of their collection with another BookWorm", function(){
    var customer2 = new Customer("Bill");
    bookstore.sell('Coder in the Rye', customer);
    bookstore.sell('The Hobbit', customer2);
    bookstore.sell('Farrenheit 451', customer);
    assert.strictEqual(customer.compareCustomerValues(customer2), 51);
  })

})









