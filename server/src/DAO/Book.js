let db;
let books;

class Book {

  static async initiate(client) {
    db = client.db('mdbooks');
    books = db.collection('books');

    await books.createIndex({ bookID: 1 }, { unique: true });

  }

  static async addBook(data) {
    const result = await books.insertOne(data);
    console.log(`Inserted a book with id: ${result.insertedId}`);
  }
}

/*

{
  _id: ...;
  title: string;
  bookID: string;
  pages: string[];
}

*/

export default Book;
