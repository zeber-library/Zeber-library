const express = require('express');
const path = require('path');
const router = require('./router/router');
const connect = require('./dbConnect');
require('dotenv').config();
const cors = require('cors');

connect(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
