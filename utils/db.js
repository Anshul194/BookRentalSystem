import mongoose from "mongoose";
import User from '../models/user.js'
import Book from "../models/books.js";

const sampleUsers = [
  { name: 'Anshul', email: 'anshul@gmail.com', phone: '1234567890', address: '123 Street A' },
  { name: 'Mohit', email: 'mohit@gmail.com', phone: '9876543210', address: '456 Street B' },
  { name: 'Ananya', email: 'anshul123@gmail.com', phone: '1122334455', address: '789 Street C' },
  { name: 'anaya', email: 'anaya@gmail.com', phone: '2233445566', address: '321 Street D' },
  { name: 'Mohika', email: 'mohika@example.com', phone: '3344556677', address: '654 Street E' },
];

const sampleBooks = [
    { bookName: "JavaScript Basics", category: "Programming", rentPerDay: 10 },
    { bookName: "Learn Node.js", category: "Programming", rentPerDay: 12 },
    { bookName: "Mastering React", category: "Programming", rentPerDay: 15 },
    {bookName: "Python for Beginners", category: "Programming", rentPerDay: 10 },
    {bookName: "Data Science with Python", category: "Data Science", rentPerDay: 18 },
    { bookName: "Artificial Intelligence", category: "Data Science", rentPerDay: 20 },
    { bookName: "Machine Learning Basics", category: "Data Science", rentPerDay: 17 },
    { bookName: "History of Rome", category: "History", rentPerDay: 8 },
    { bookName: "World War II", category: "History",rentPerDay: 9 },
    {bookName: "Modern History", category: "History", rentPerDay: 7 },
    {bookName: "Shakespeare's Works", category: "Literature", rentPerDay: 12 },
  { bookName: 'Harry Potter and the Sorcerer\'s Stone', category: 'Fantasy', rentPerDay: 10 },
  { bookName: 'The Great Gatsby', category: 'Classic', rentPerDay: 8 },
  { bookName: 'To Kill a Mockingbird', category: 'Classic', rentPerDay: 7 },
  { bookName: '1984', category: 'Dystopian', rentPerDay: 5 },
  { bookName: 'The Hobbit', category: 'Fantasy', rentPerDay: 10 },
  { bookName: 'Pride and Prejudice', category: 'Romance', rentPerDay: 6 },
  { bookName: 'The Catcher in the Rye', category: 'Classic', rentPerDay: 6 },
  { bookName: 'Moby Dick', category: 'Adventure', rentPerDay: 9 },
  { bookName: 'War and Peace', category: 'Historical Fiction', rentPerDay: 12 },
  { bookName: 'The Da Vinci Code', category: 'Thriller', rentPerDay: 8 },
];

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
    
    // Insert sample users
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.insertMany(sampleUsers);
      console.log('Sample users inserted');
    }

    // Insert sample books
    const bookCount = await Book.countDocuments();
    if (bookCount === 0) {
      await Book.insertMany(sampleBooks);
      console.log('Sample books inserted');
    }
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDb;
