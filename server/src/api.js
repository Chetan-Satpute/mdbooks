import { Router } from "express";

import MDXRouter from "./routes/mdx.js";
import BookRouter from "./routes/book.js";

const router = Router();

router.route('/').get((req, res) => {
  res.send('<h1>Markdown Books API</h1>');
});

router.use("/mdx", MDXRouter);
router.use("/book", BookRouter);

export default router;
