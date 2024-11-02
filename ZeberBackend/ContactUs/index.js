const express = require("express");
const cors = require("cors");
const mainRouter = require("./Routes/main");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(PORT, (err) => {
    if (err) {
        console.error(`Failed to start server: ${err}`);
    } else {
        console.log(`Server running on http://localhost:${PORT}`);
    }
});