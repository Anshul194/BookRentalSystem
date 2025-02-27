import express from 'express'
import Book from '../models/books.js'


export const addBook = async (bookData) => {
    try {
      const book = new Book(bookData);
      return await book.save();
    } catch (error) {
      throw new Error('Error adding book: ' + error.message);
    }
  };
  
  // Fetch all books
  export const getAllBooks = async () => {
    try {
      return await Book.find({});
    } catch (error) {
      throw new Error('Error fetching books: ' + error.message);
    }
  };

export const getBookByName= async(name)=>{
    try {
        const books = await Book.find({ bookName: { $regex: name, $options: 'i' } });
        return books;
    } catch (error) {
        throw new Error('Database query failed');
    }

}



export const getBooksByRentRangeService = async (minRent, maxRent) => {
    try {
        // Fetch books whose rent per day falls between the given range
        const books = await Book.find({
            rentPerDay: { $gte: minRent, $lte: maxRent }
        });
        return books;
    } catch (error) {
        throw new Error('Error fetching books by rent range');
    }
};


export const filterBooksService = async (category, name, minRent, maxRent) => {
    try {
        // Find books based on category, name, and rent range
        const books = await Book.find({
            category: category,
            bookName: { $regex: name, $options: 'i' },
            rentPerDay: { $gte: minRent, $lte: maxRent }
        });
        return books;
    } catch (error) {
        throw new Error('Error fetching filtered books');
    }
};


