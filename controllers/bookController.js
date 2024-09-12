import express from 'express'
import { getBookByName ,getAllBooks,getBooksByRentRangeService,addBook,filterBooksService} from '../services/bookService.js';



export const createBook = async (req, res) => {
    try {
      const book = await addBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Fetch all books
  export const fetchAllBooks = async (req, res) => {
    try {
      const books = await getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//- book name or a term in the name of the book
export const bookSearchByName = async (req, res) => {
    try{
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: 'Book name  is required' });
    }
    const books = await getBookByName(name);
    if (books.length === 0) {
        return res.status(404).json({ message: 'No books found' });
    }

    return res.status(201).json({
        message: "Book found",
        books,
        success: true,
    })}
catch(error){
    res.status(500).json({ message: 'Server error', error: error.message ,success:false});
}
  };

 export  const getBooksByRentRange = async (req, res) => {
    try {
        const { minRent, maxRent } = req.query;

        // Convert minRent and maxRent to numbers
        const min = parseFloat(minRent);
        const max = parseFloat(maxRent);

        // Validate inputs
        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ message: 'Invalid rent range' });
        }

        // Call the service to get books within the rent range
        const books = await getBooksByRentRangeService(min, max);
        
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found within this rent range' });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
  


export const filterBooks = async (req, res) => {
    try {
        const { category, name, minRent, maxRent } = req.query;

        if (!category || !name || !minRent || !maxRent) {
            return res.status(400).json({ message: 'Missing required query parameters' });
        }

        const min = parseFloat(minRent);
        const max = parseFloat(maxRent);

        if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ message: 'Invalid rent range' });
        }
        const books = await filterBooksService(category, name, min, max);
        
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found matching the filter criteria' });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};