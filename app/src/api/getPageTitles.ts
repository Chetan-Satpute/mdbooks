import { SERVER_URL } from ".";

const getPageTitles = async () => {
  const response = await fetch(`${SERVER_URL}/book`)
  const data = (await response.json());
  return data;
}

export default getPageTitles;
