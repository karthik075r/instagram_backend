import { Router } from "express";
import { getAuthUrl, handleAuthCallback } from "../managers/AuthManager";

const router = Router();

router.get("/instagram", (_req, res) => {
  const url = getAuthUrl();
  console.log("url", url);

  res.redirect(url);
});

router.get("/instagram/callback", async (req, res) => {
  console.log("req.query", req.query);
  const { code } = req.query;
  if (!code) return res.status(400).send("Code not provided");
  const userData = await handleAuthCallback(code as string);
  res.json(userData);
});

export default router;
