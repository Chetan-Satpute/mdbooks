import { Router } from "express";

import MDXRouter from "./routes/mdx.js";

const router = Router();

router.use("/mdx", MDXRouter);

export default router;
