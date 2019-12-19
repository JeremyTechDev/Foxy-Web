import * as express from 'express';
import DB from "./db";

const router = express.Router();

router.get("/api/books", async (req, res) => {
    try {
        let books = await DB.Books.all();
        res.json(books);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;