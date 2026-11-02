const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, unique: true, trim: true },
  category: { type: String, required: true, trim: true },
  status: { type: String, enum: ["Available", "Issued"], default: "Available" }
}, { timestamps: true });
const Book = mongoose.model("Book", schema);

app.get("/api/books", async (req, res) => {
  try {
    const q = (req.query.search || "").trim();
    const filter = q ? { $or: ["title","author","isbn","category"].map(k => ({[k]: {$regex:q,$options:"i"}})) } : {};
    res.json(await Book.find(filter).sort({createdAt:-1}));
  } catch { res.status(500).json({message:"Could not load books."}); }
});
app.post("/api/books", async (req,res) => {
  try {
    const {title,author,isbn,category,status} = req.body;
    if (!title || !author || !isbn || !category) return res.status(400).json({message:"Fill all required fields."});
    res.status(201).json(await Book.create({title,author,isbn,category,status}));
  } catch(e) { res.status(e.code===11000?409:400).json({message:e.code===11000?"ISBN already exists.":"Could not save book."}); }
});
app.put("/api/books/:id", async (req,res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    if (!book) return res.status(404).json({message:"Book not found."});
    res.json(book);
  } catch { res.status(400).json({message:"Could not update book."}); }
});
app.delete("/api/books/:id", async (req,res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({message:"Book not found."});
    res.json({message:"Book deleted."});
  } catch { res.status(400).json({message:"Could not delete book."}); }
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));

const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/library_portal")
.then(()=>app.listen(PORT,()=>console.log(`Library Portal: http://localhost:${PORT}`)))
.catch(e=>{console.error("MongoDB connection failed:",e.message);process.exit(1);});
