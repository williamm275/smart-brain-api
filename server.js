import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import cors from "cors";
import knex from "knex";
import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import handleProfileGet from "./controllers/profile.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "smart-brain",
  },
});

const app = express();
const saltRounds = 10;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => { res.send('success') });
app.post("/signin", handleSignin(db, bcrypt));
app.post("/register", handleRegister(db, bcrypt, saltRounds));
app.get("/profile/:id", handleProfileGet(db));
app.put("/image", handleImage(db));
app.post("/imageUrl", handleApiCall);

app.listen(3000, () => {
  console.log(`app is running on port 3000`);
});
