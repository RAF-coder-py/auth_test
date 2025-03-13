import express from "express";
import { signIn } from "../modules/firebase.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log("GET request received");
});

router.post("/", async (req, res) => {
  try {
    const user = await signIn(req.body.email, req.body.password);
  } catch (err) {
    res.send({ message: "wrong email or password" });
  }
});

export default router;
