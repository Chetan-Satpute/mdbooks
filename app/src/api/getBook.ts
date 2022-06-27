import { SERVER_URL } from ".";

const getBook = async (bookID: string) => {
  const response = await fetch(`${SERVER_URL}/book/${bookID}`)
  const data = (await response.json());
  return data;
}

export default getBook;
