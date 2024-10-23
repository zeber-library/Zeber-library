const express = require("express");
const app = express();
const mainRouter = require('./Routes/main');
const cors = require('cors');

app.use(cors());
app.use('/api/v1', mainRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000')
})