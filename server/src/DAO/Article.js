let db;
let articles;

class Book {

  static async initiate(client) {
    db = client.db('mdbooks');
    articles = db.collection('articles');

    await articles.createIndex({ bookID: 1 }, { unique: true });

  }

  static async addBook(data) {
    const result = await articles.insertOne(data);
    console.log(`Inserted a book with id: ${result.insertedId}`);
  }
}

/*

{
  _id: ...;
  title: string;
  article: string;
  pages: string[];
}

*/

export default Book;
