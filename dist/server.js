"use strict";
const express = require("express");
const userRoutes = require("./routes/user");
const app = express();
app.use("/api/users", userRoutes);
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`💡Server is running at port ${PORT}`));
//# sourceMappingURL=server.js.map