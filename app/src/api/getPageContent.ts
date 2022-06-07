import { SERVER_URL } from ".";

const mdxString = `

# Hello World

This is some *mdx* markdown text

<Canvas draw={async (canvas, ctx) => {

  canvas.width = 5000;
  canvas.height = 500;

  ctx.moveTo(250, 250);
  ctx.arc(250, 250, 200, 0, 2 * Math.PI);

  ctx.stroke();

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
