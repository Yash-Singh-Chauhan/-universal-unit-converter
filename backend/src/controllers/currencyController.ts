import type { Request, Response, NextFunction } from "express";
import { exchangeRateService } from "../services/exchangeRateService.js";
import { AppError } from "../middleware/errorHandler.js";

export async function convertCurrency(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      throw new AppError(
        "Missing required parameters: from, to, amount",
        400,
        "MISSING_PARAMS"
      );
    }

    const fromCurrency = (from as string).toUpperCase();
    const toCurrency = (to as string).toUpperCase();
    const parsedAmount = Number.parseFloat(amount as string);

    if (Number.isNaN(parsedAmount)) {
      throw new AppError("Invalid amount", 400, "INVALID_AMOUNT");
    }

    if (parsedAmount < 0) {
      throw new AppError("Amount cannot be negative", 400, "NEGATIVE_AMOUNT");
    }

    const result = await exchangeRateService.convert(
      parsedAmount,
      fromCurrency,
      toCurrency
    );

    res.json({
      success: true,
      amount: parsedAmount,
      from: fromCurrency,
      to: toCurrency,
      rate: result.rate,
      convertedAmount: result.convertedAmount,
      lastUpdated: result.lastUpdated,
    });
  } catch (err) {
    next(err);
  }
}

export async function getRates(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { base } = req.query;
    const baseCurrency = ((base as string) ?? "USD").toUpperCase();

    const result = await exchangeRateService.getRates(baseCurrency);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
}
