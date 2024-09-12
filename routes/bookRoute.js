import express from 'express';
import { bookSearchByName,getBooksByRentRange,filterBooks,createBook,fetchAllBooks} from '../controllers/bookController.js'; // Import controller

const BooksRouter = express.Router();

BooksRouter.post('/add', createBook)
BooksRouter.get('/list', fetchAllBooks); 
BooksRouter.get('/search', bookSearchByName); 
BooksRouter.get('/rent-range', getBooksByRentRange);
BooksRouter.get('/filter', filterBooks);

export default BooksRouter;
