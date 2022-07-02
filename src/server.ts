const express = require("express");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const app = express();
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes)

const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`💡Server is running at port ${PORT}`));
