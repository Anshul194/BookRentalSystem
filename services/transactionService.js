import Transaction from "../models/Transaction.js";
import User from "../models/user.js";
import Book from "../models/books.js";


export const issueBookService = async (bookId, userId, issueDate) => {
    try {
        // Validate book and user existence
        const book = await Book.findById(bookId);
        const user = await User.findById(userId);

        if (!book) throw new Error('Book not found');
        if (!user) throw new Error('User not found');

        // Create a new transaction entry
        const transaction = new Transaction({
            bookId,
            userId,
            issueDate,
        });

        await transaction.save();
        return transaction;
    } catch (error) {
        throw new Error('Error issuing book: ' + error.message);
    }
};

// Service to return a book and calculate rent
export const returnBookService = async (bookId, userId, returnDate) => {
    try {
        // Ensure returnDate is a valid date string
        if (!returnDate || isNaN(new Date(returnDate).getTime())) {
            throw new Error('Invalid return date');
        }

        // Find the transaction record for the issued book
        const transaction = await Transaction.findOne({
            bookId,
            userId,
            returnDate: { $exists: false } // Find transaction with no return date
        });

        if (!transaction) throw new Error('Transaction not found or book already returned');

        // Update return date and calculate total rent
        transaction.returnDate = returnDate;

        const issueDate = new Date(transaction.issueDate);
        const returnDateObj = new Date(returnDate);

        // Ensure issueDate and returnDate are valid dates
        if (isNaN(issueDate.getTime()) || isNaN(returnDateObj.getTime())) {
            throw new Error('Invalid issue date or return date');
        }

        // Calculate days rented
        const daysRented = Math.ceil((returnDateObj - issueDate) / (1000 * 60 * 60 * 24));

        // Fetch the book to get the rent per day
        const book = await Book.findById(bookId);

        if (!book) throw new Error('Book not found');

        // Ensure rentPerDay is a valid number
        const rentPerDay = parseFloat(book.rentPerDay);
        if (isNaN(rentPerDay)) {
            throw new Error('Invalid rent per day for the book');
        }

        // Calculate total rent
        const totalRent = daysRented * rentPerDay;
        transaction.totalRent = totalRent;

        // Save the transaction with the updated return date and total rent
        await transaction.save();
        return transaction;
    } catch (error) {
        throw new Error('Error returning book: ' + error.message);
    }
};


export const getBookTransactionHistory = async (bookName) => {
    try {
        // Find the book by name
        const book = await Book.findOne({ bookName });

        if (!book) throw new Error('Book not found');

        // Find all transactions related to this book
        const transactions = await Transaction.find({ bookId: book._id }).populate('userId');

        const currentlyIssued = transactions.find((transaction) => !transaction.returnDate);

        return {
            totalIssuedCount: transactions.length,
            currentlyIssued: currentlyIssued ? currentlyIssued.userId : 'Not issued at the moment',
            transactionHistory: transactions,
        };
    } catch (error) {
        throw new Error('Error fetching transaction history: ' + error.message);
    }
};

// Service to get total rent generated by a book
export const getTotalRentGenerated = async (bookName) => {
    try {
        const book = await Book.findOne({ bookName });

        if (!book) throw new Error('Book not found');

        const transactions = await Transaction.find({ bookId: book._id });
        const totalRent = transactions.reduce((acc, transaction) => acc + transaction.totalRent, 0);

        return { totalRent };
    } catch (error) {
        throw new Error('Error calculating total rent: ' + error.message);
    }
};

// Service to get books issued to a specific person
export const getBooksIssuedToUser = async (userId) => {
    try {
        const transactions = await Transaction.find({ userId }).populate('bookId');
        return transactions;
    } catch (error) {
        throw new Error('Error fetching user transactions: ' + error.message);
    }
};

// Service to get books issued in a date range
export const getBooksIssuedInDateRange = async (startDate, endDate) => {
    try {
        const transactions = await Transaction.find({
            issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
        }).populate('bookId userId');

        return transactions;
    } catch (error) {
        throw new Error('Error fetching transactions in date range: ' + error.message);
    }
};