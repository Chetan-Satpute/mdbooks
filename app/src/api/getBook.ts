import { SERVER_URL } from ".";

export interface Book { bookID: string; pages: string; title: string };

const getBook = async (
  bookID: string
): Promise<Book> => {
  const response = await fetch(`${SERVER_URL}/book/${bookID}`);
  const data = await response.json();
  return data;
};

export default getBook;
