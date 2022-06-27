import { Router } from "express";
import Book from '../DAO/Book.js';

const router = Router();

router.get("/", async (req, res) => {
  res.send(await Book.getBookTitles());
});

router.get('/:bookID', async (req, res) => {
  res.send(await Book.getBookByBookID(req.params.bookID));
});

export default router;
