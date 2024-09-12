// routes/userRoutes.js
import express from 'express';
import { createUser, fetchAllUsers } from '../controllers/userController.js';

const userRouter = express.Router();

// Route to add a new user
userRouter.post('/register', createUser);

// Route to fetch all users
userRouter.get('/list', fetchAllUsers);

export default userRouter;
