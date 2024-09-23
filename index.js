const express = require('express');
const mysql = require('mysql2');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Database connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Disha1606', // Use your MySQL password here
    database: 'vbc_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database!');
});

// Routes

// Add a new product
app.post('/admin/products', (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    const query = 'INSERT INTO products (name, price, description, imageUrl) VALUES (?, ?, ?, ?)';
    db.query(query, [name, price, description, imageUrl], (err, result) => {
        if (err) throw err;
        res.send({ success: true, productId: result.insertId });
    });
});

// Get all products
app.get('/admin/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Delete a product by ID
app.delete('/admin/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [productId], (err, result) => {
        if (err) throw err;
        res.send({ success: true });
    });
});

// Place an order (user)
app.post('/user/orders', (req, res) => {
    const { userId, productId, quantity } = req.body;
    const query = 'INSERT INTO orders (userId, productId, quantity) VALUES (?, ?, ?)';
    db.query(query, [userId, productId, quantity], (err, result) => {
        if (err) throw err;
        res.send({ success: true, orderId: result.insertId });
    });
});

// Get orders for a user
app.get('/user/orders/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM orders WHERE userId = ?';
    db.query(query, [userId], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add to cart (user)
app.post('/user/cart', (req, res) => {
    const { userId, productId, quantity } = req.body;
    const query = 'INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)';
    db.query(query, [userId, productId, quantity], (err, result) => {
        if (err) throw err;
        res.send({ success: true, cartItemId: result.insertId });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
