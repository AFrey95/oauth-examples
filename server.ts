import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import auth from "./auth";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGOOSE_KEY || "")
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.log("COULD NOT CONNECT TO MONGODB", err);
  });

const app = express();

auth(app, { google: true });

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

if (process.env.NODE_ENV === "production") {
  // serve up js, css, etc
  app.use(express.static("client/build"));

  // serve up statics like html when it doesn't recognize the route above
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT);
