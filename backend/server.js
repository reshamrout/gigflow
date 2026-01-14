const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");
const { initSocket } = require("./config/socket");
const authRoutes = require("./routes/auth.routes");
const gigRoutes = require("./routes/gig.routes");
const bidRoutes = require("./routes/bid.routes");


const app = express();
const server = http.createServer(app);

require("dotenv").config();
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

connectDB();
initSocket(server);

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
