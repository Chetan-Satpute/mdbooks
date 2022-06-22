import { SERVER_URL } from ".";

const getJSX = async (mdxString: string) => {

  const response = fetch(`${SERVER_URL}/mdx`, {
    method: "POST",
    body: JSON.stringify({
      mdx: mdxString,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const data = (await response).json();
  return data;
};

export default getJSX;
