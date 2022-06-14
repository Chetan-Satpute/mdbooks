import { SERVER_URL } from ".";

const mdxString = `

# Hello World

This is some *mdx* markdown text

<Canvas draw={(ctx) => {

  let x = 0;

  return () => {
    ctx.beginPath();

    ctx.arc(100 + x, 100, 20, 0, 2 * Math.PI);

    ctx.closePath();

    ctx.stroke();

     if (x !== 50)
     x += 2;
  }

}} />

`;

const getPageContent = async () => {
  // TODO: Take page id and return page content
  // currently it returns a sample page

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

export default getPageContent;
