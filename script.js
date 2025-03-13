import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { onAuthStateChanged } from "firebase/auth";

import router from "./backend/routes/Users.js";
import auth from "./backend/modules/firebase.js";

// EXPRESS //
const app = express();
const PORT = process.env.PORT || 3000;

////// MIDDLEWARE //////
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

////// GET FRONTEND //////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "connect.html"));
});

////// Routes //////

app.use("/users", router);

// LISTEN //
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
  } else {
    console.log("No user is signed in");
  }
});
