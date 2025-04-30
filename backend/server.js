const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: Date,
    image: String
});

const Book = mongoose.model('Book', bookSchema);

// Routes
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find().sort({ date: -1 });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books' });
    }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
