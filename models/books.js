import mongoose from "mongoose";

const bookSchema= new mongoose.Schema({
    bookName: {
        type: String,
        required: [true, 'Book name is required'],
        trim: true, 
        minlength: [2, 'Book name must be at least 2 characters'],
        maxlength: [100, 'Book name must not exceed 100 characters'],
        index: true 
      },
      category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
      },
      rentPerDay: {
        type: Number,
        required: [true, 'Rent per day is required'],
        min: [0, 'Rent per day cannot be negative'], 
      }
    }, {
      timestamps: true, 
      versionKey: false 
    });

const Book = mongoose.model('Book', bookSchema);

export default Book;