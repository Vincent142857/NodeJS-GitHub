// @ts-ignore
const express = require('express')
const app = express()
// @ts-ignore
const port = process.env.POST || 3000;
const courseRoute = require('./routes/courses.route');
// @ts-ignore
app.use(express.json());

// @ts-ignore
app.use('/course', courseRoute);

// @ts-ignore
app.get('/', (req, res) => res.send('Hello World!'));


// @ts-ignore
app.listen(port, () => console.log(`This app listening on port ${port}!`))