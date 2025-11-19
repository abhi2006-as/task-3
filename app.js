const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// book storage
let books = [
  { id: 1, title: "Book One", author: "Author A" },
  { id: 2, title: "Book Two", author: "Author B" }
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.title = title;
  book.author = author;
  res.json(book);
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: "Book deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
