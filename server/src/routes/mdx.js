import { Router } from "express";
import { serialize } from "next-mdx-remote/serialize";
import rehypeKatex from "rehype-katex";
import rehypeMathJaxSvg from "rehype-mathjax";
import remarkMath from "remark-math";
import remarkPrism from 'remark-prism';
import status from "status-code";

const router = Router();

router.route("/").post(async (req, res) => {
  try {
    const { mdx: source } = req.body;

    if (source === undefined || typeof source !== "string") {
      res.status(status.BAD_REQUEST_400);
      res.send({ error: "MDX string requied !" });
      return;
    }

    const compiledSource = await serialize(source, {
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkPrism],
        rehypePlugins: [rehypeMathJaxSvg],
        format: "mdx",
      },
    });

    res.send({ source: compiledSource });
  } catch (err) {
    res.statusCode = status.BAD_REQUEST_400;
    res.send({ error: err.message });
  }
});

export default router;
