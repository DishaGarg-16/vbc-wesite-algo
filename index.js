require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Admin routes
app.post('/admin/products', async (req, res) => {
  const product = req.body;
  const query = 'INSERT INTO products (name, price, description, imageUrl) VALUES (?, ?, ?, ?)';
  connection.query(query, [product.name, product.price, product.description, product.imageUrl], (error, results) => {
    if (error) return res.status(500).send(error);
    res.send({ success: true, productId: results.insertId });
  });
});

app.get('/admin/products', async (req, res) => {
  const query = 'SELECT * FROM products';
  connection.query(query, (error, results) => {
    if (error) return res.status(500).send(error);
    res.send(results);
  });
});

app.delete('/admin/products/:id', async (req, res) => {
  const query = 'DELETE FROM products WHERE id = ?';
  connection.query(query, [req.params.id], (error, results) => {
    if (error) return res.status(500).send(error);
    res.send({ success: true });
  });
});

// User routes
app.post('/user/orders', (req, res) => {
  // Handle order placement
  res.send({ success: true });
});

app.get('/user/orders/:id', (req, res) => {
  // Fetch user orders (implement as needed)
  res.send({ order: {} });
});

app.post('/user/cart', (req, res) => {
  // Handle adding to cart (implement as needed)
  res.send({ success: true });
});

// Define a port for the app to listen on
const PORT = process.env.PORT || 3000; // Default to 3000 if not specified

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
