let db;
let books;

class Book {
  static async initiate(client) {
    db = client.db("mdbooks");
    books = db.collection("books");

    await books.createIndex({ bookID: 1 }, { unique: true });
  }

  static async addBook(data) {
    const result = await books.insertOne(data);
    console.log(`Inserted a book with id: ${result.insertedId}`);
  }

  static async getBookTitles() {
    return await books.find().toArray();
  }

  static async getBookByBookID(bookID) {
    const doc = await books.findOne({ bookID: bookID });
    return doc;
  }
}

/*

{
  _id: ...;
  title: string;
  bookID: string;
  pages: string;
}

*/

export default Book;
