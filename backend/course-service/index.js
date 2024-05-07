const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
