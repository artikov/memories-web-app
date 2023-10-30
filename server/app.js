import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postsRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

// APP INITIALIZATION
const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postsRoutes);
app.use("/user", userRoutes);

// ------------ THE CODE BELOW NEEDED FOR DEPLOYMENT --------- //
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
	// set static folder
	app.use(express.static(path.join(__dirname, "/client/build")));

	// any route that is not api route
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
} else {
	app.use("/", (req, res) => {
		res.send("Welcome to Memories API");
	});
}

// MONGODB CONFIGURATION
const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL)
	.then(() =>
		app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
	)
	.catch((err) => console.log(err.message));
