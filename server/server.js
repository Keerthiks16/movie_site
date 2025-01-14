import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import tvRoutes from "./routes/tv.routes.js";
import searchRoutes from "./routes/search.routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middlewares/protectRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.send("Welcome to Movie Time Server, lessgo");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

app.listen(PORT, () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log(`Mongodb connection successful to ${MONGO_URI}`))
    .catch((error) => console.log(`Error in Mongodb Connection: ${error}`));
  console.log(`Server running on: http://localhost:${PORT}`);
});
