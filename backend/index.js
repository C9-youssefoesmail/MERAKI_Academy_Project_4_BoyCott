require("dotenv").config()
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// import database connection
const db = require("./models/db");
// import articles Router
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const rolesRouter = require("./routes/roles");
const commentsRouter = require("./routes/comments");
const contactRouter = require("./routes/contact");
const categoriesRouter = require("./routes/categories");

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/roles",rolesRouter);
app.use("/comments",commentsRouter);
app.use("/contact",contactRouter);
app.use("/categories",categoriesRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
