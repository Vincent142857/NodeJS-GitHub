const express = require('express');
// @ts-ignore
const path = require('path');

const app = express();
const port = 3000

// Import the routes
const indexRouter = require('./routes/index');

// Set the view engine to Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the index router for the root path
app.use('/', indexRouter);

// @ts-ignore
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));