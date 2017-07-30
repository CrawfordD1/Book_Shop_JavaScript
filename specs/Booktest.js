var assert = require('assert');
var Book = require('../Book.js');
var BookStore = require('../BookStore.js');
var Customer = require('../Customer.js');

describe('BookStore', function() {

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
    customer = new Customer("Craw");
  })

  it("should be able to add a book to the bookstore", function(){
    bookstore.add(lotr);
    assert.strictEqual(bookstore.inventory.length, 1);
  })

  it("should print out the Book's properties as a string", function(){
    assert.strictEqual(lotr.details() ,"Title: LOTR | Author: JRR | Genre: Fantasy | Pages: 500 | Price: £10");
  })

  it("find index of book by title", function(){
    bookstore.add(lotr);
    bookstore.add(CITR);
    bookstore.add(F451);
    bookstore.add(Hobbit);
    assert.strictEqual(bookstore.findIndexByTitle('The Hobbit') ,3)
  })

  it("Book Store can sell a Book and adjusts the Store's balance", function(){
      bookstore.add(lotr);
      bookstore.add(Hobbit);
      bookstore.sell('The Hobbit', customer);
      assert.strictEqual(bookstore.inventory.length , 1);
      assert.strictEqual(bookstore.balance ,1007);
  })

  it("report the financials; Balance and value of inventory.", function(){
      bookstore.add(lotr);
      bookstore.add(Hobbit);
      bookstore.add(Bible);
      bookstore.sell('The Bible', customer);
      assert.strictEqual(bookstore.financials(), "Balance: 1013 | Total Stock Value: 17");
  })

  it("the store should be able to view all Books of a given Genre.", function(){
      bookstore.add(lotr);
      bookstore.add(Bible);
      bookstore.add(F451);
      bookstore.add(CITR);
      assert.deepEqual(bookstore.viewGenre('Fantasy'), [lotr, Bible]);
  })

})
















