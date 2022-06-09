import { SERVER_URL } from ".";

const mdxString = `

# Hello World

This is some *mdx* markdown text

<Canvas height={500} width={5000} draw={async (ctx) => {

  ctx.beginPath();

  ctx.arc(250, 250, 20, 0, 2 * Math.PI);

  ctx.closePath();

  ctx.stroke();

}} />

This is some <u>mdx</u> markdown text

<Canvas height={400} width={500} draw={async (ctx) => {

  ctx.beginPath();

  ctx.moveTo(100, 100);
  ctx.lineTo(200, 100);
  ctx.lineTo(200, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 100);

  ctx.closePath();

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
