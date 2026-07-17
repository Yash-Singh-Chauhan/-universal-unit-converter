import { Router } from "express";
import { convertCurrency, getRates } from "../controllers/currencyController.js";

const router = Router();

router.get("/convert", convertCurrency);
router.get("/rates", getRates);

export default router;
