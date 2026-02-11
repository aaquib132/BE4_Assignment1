const { initilizedDatbase } = require('./db/db.connect')
const Books = require('./models/books.models')
initilizedDatbase()
const express = require('express')
const app = express()

require('dotenv').config()
app.use(express.json())

const createBookData = async (newBooks) => {
    try {
        const create = new Books(newBooks)
        const saveData = await create.save()
        return saveData
    } catch (error) {
        throw error
    }
}

app.post("/books", async (req, res) => {
    try {
        const createBook = await createBookData(req.body)
        res.status(201).json({message: "Book data created successfully", book: createBook })
    } catch (error) {
        res.status(500).json({error: "Failed to create Book data"})
    }
})

// 3. Create an API to get all the books in the database as response. Make sure to do error handling.

const findAllBooksData = async () => {
    try {
        const books = await Books.find()
        return books
    } catch (error) {
        throw error
    }
}

app.get("/books", async (req,res) => {
    
    try {
       const books = await findAllBooksData() 
       if(books){
        res.json(books)
       }else{
        res.status(404).json({error: "Book not found"})
       }
    } catch (error) {
        console.log("Failed to fetch books data", error)
    }
})

// 4. Create an API to get a book's detail by its title. Make sure to do error handling.

const findBooksById = async (bookTitle) => {
    
    try {
        const findBook = await Books.findOne({title: bookTitle})
        return findBook
    } catch (error) {
        throw error
    }
}

app.get("/books/:title", async (req, res) => {
    try {
        const book = await findBooksById(req.params.title)
        if(book.length != 0){
            res.json(book)
        }else{
            res.status(404).json({error: "Book not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch Book data"})
    }
})

// 5. Create an API to get details of all the books by an author. Make sure to do error handling.

const findBooksByAuthor = async (bookAuthor) => {
    
    try {
        const findBook = await Books.find({author: bookAuthor})
        return findBook
    } catch (error) {
        throw error
    }
}

app.get("/books/author/:authorName", async (req, res) => {
    try {
        const book = await findBooksByAuthor(req.params.authorName)
        if(book.length != 0){
            res.json(book)
        }else{
            res.status(404).json({error: "Book not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch Book data"})
    }
})

// 6. Create an API to get all the books which are of "Business" genre.

const findBooksByGenre = async (bookGenre) => {
    
    try {
        const findBook = await Books.find({genre: bookGenre})
        return findBook
    } catch (error) {
        throw error
    }
}

app.get("/books/genre/:genreName", async (req, res) => {
    try {
        const book = await findBooksByGenre(req.params.genreName)
        if(book.length != 0){
            res.json(book)
        }else{
            res.status(404).json({error: "Book not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch Book data"})
    }
})

// 7. Create an API to get all the books which was released in the year 2012.


const findBooksByDate = async (bookDate) => {
    
    try {
        const findBook = await Books.find({publishedYear: bookDate})
        return findBook
    } catch (error) {
        throw error
    }
}

app.get("/books/published/:year", async (req, res) => {
    try {
        const book = await findBooksByDate(req.params.year)
        if(book){
            res.json(book)
        }else{
            res.status(404).json({error: "Book not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch Book data"})
    }
})

// 8. Create an API to update a book's rating with the help of its id. Update the rating of the "Lean In" from 4.1 to 4.5. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.  Updated book rating: { "rating": 4.5 }

const updateRating = async (bookId, dataToUpdate) => {
    try {
        const update = await Books.findByIdAndUpdate(bookId, dataToUpdate, {new : true})
        return update
    } catch (error) {
        throw error
    }
}

app.post("/books/:id", async (req, res) => {
    try {
        const update = await updateRating(req.params.id, req.body)
        if(update){
            res.json(update)
        }else{
            res.status(404).json({error: "Book not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update Book data"})
    }
})

// 9. Create an API to update a book's rating with the help of its title. Update the details of the book "Shoe Dog". Use the query .findOneAndUpdate() for this. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling. Updated book data: { "publishedYear": 2017, "rating": 4.2 }


const updateYearAndRating = async (bookTitle, dataToUpdate) => {
    try {
        const update = await Books.findOneAndUpdate({title: bookTitle}, dataToUpdate, {new : true})
        return update
    } catch (error) {
        throw error
    }
}

app.post("/books/bookTitle/:bookName", async (req, res) => {
    try {
        const update = await updateYearAndRating(req.params.bookName, req.body)
        if(update){
            res.json(update)
        }else{
            res.status(404).json({error: "Book not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to update Book data"})
    }
})

// 10. Create an API to delete a book with the help of a book id, Send an error message "Book not found" in case the book does not exist. Make sure to do error handling.

const deleteBookData = async (bookId) => {
    try {
        const deleteData = await Books.findByIdAndDelete(bookId)
        return deleteData
    } catch (error) {
        throw error
    }
}

app.delete("/books/:id", async (req, res) => {
    try {
        const deleteData = await deleteBookData(req.params.id)
        if(deleteData){
            res.status(200).json({message: "Book Data deleted successfully", data: deleteData})
        }else{
            res.status(404).json({error: "Book not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete Book data"})
    }
})



const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`))