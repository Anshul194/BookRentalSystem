import express from'express'
import TransactionRouter from './transactionRoute.js'
import BooksRouter from './bookRoute.js';
import userRouter from './userRoute.js';
const Router = express.Router();

Router.use('/transactions/', TransactionRouter);  
Router.use('/books/', BooksRouter); 
Router.use('/user',userRouter)

export default Router;

