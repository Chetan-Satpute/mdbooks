import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Book Route");
});

router.get('/:bookID', (req, res) => {
  res.send(req.params);
});

export default router;
