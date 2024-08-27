const mongoose = require('mongoose');
require('dotenv').config()
const url = process.env.MONGO_DB_URL;

const conn = async () => {
    await mongoose.connect(url, { useNewUrlParser: true })
        .then(() => console.log('Connected Successfully'))
        .catch((err) => console.error('Not Connected', err));
}




module.exports = conn;