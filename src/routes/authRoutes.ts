import { Router } from "express";
import { getAuthUrl, handleAuthCallback } from "../managers/AuthManager";
import { validateAuthHeader } from "../middlewares/authHeaderValidator";
import { eAuthRoutes } from "../utils/constants";

const { instagram, callback } = eAuthRoutes;

const router = Router();

router.get(instagram, (_req, res) => {
  const url = getAuthUrl();
  console.log("url", url);

  res.redirect(url);
});

router.get(callback, validateAuthHeader, async (req, res, next) => {
  console.log("req.query", req.query);
  const { code } = req.query;

  try {
    const userData = await handleAuthCallback(code as string);
    res.json(userData);
  } catch (err: any) {
    console.log("err", err.response.data);
    if (!err.status) err.status = 500;
    next(err);
  }
});

export default router;
