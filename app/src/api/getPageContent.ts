import { SERVER_URL } from ".";

const mdxString = `

This is some *mdx* markdown text

<Canvas height={80} width={80} draw={(ctx) => {
  return () => {
    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(20, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 20);

    ctx.arc(60, 60, 20, 0, 2 * Math.PI);

    ctx.closePath();

    ctx.stroke();
  }
}} />

This is some *mdx* markdown text

This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text
This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

This is some *mdx* markdown text

<Canvas height={20} width={20} draw={(ctx) => {
  return () => {
    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(20, 0);
    ctx.lineTo(20, 20);
    ctx.lineTo(0, 20);

    ctx.closePath();

    ctx.stroke();
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
