import express from'express'
import {issueBook,returnBook,bookTransactionHistory,booksIssuedInDateRange,booksIssuedToUser,totalRentGenerated} from '../controllers/transactionController.js'

const TransactionRouter = express.Router();

TransactionRouter.post('/issue', issueBook);  
TransactionRouter.post('/return', returnBook);
TransactionRouter.get('/book-history', bookTransactionHistory);   
TransactionRouter.get('/total-rent', totalRentGenerated);       
TransactionRouter.get('/user-books', booksIssuedToUser);          
TransactionRouter.get('/date-range', booksIssuedInDateRange); 

export default TransactionRouter;
