import express from 'express';
import { bookSearchByName,getBooksByRentRange,filterBooks} from '../controllers/bookController.js'; // Import controller

const BooksRouter = express.Router();

BooksRouter.get('/search', bookSearchByName); 
BooksRouter.get('/rent-range', getBooksByRentRange);
BooksRouter.get('/filter', filterBooks);

export default BooksRouter;
