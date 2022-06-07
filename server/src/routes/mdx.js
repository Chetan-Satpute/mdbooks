import { Router } from "express";
import { serialize } from "next-mdx-remote/serialize";
import status from "status-code";

const router = Router();

router.route("/").post(async (req, res, next) => {
  const { mdx: source } = req.body;

  if (source === undefined || typeof source !== "string") {
    res.status(status.BAD_REQUEST_400);
    res.send({ error: "MDX string requied !" });
    return;
  }

  const compiledSource = await serialize(source);

  res.send(compiledSource);
});

export default router;
