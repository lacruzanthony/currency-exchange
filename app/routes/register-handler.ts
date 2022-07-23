import express, { Request, Response } from "express";
import { body } from "express-validator";
import NodeCache from "node-cache";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { randomApiKey } from "../services/generate-key";

const TTL_DAYS = 30 * 3600;

const router = express.Router();
const cache = new NodeCache({ stdTTL: TTL_DAYS });

router.post(
  "/register",
  [body("username").notEmpty().isString().withMessage("User must be valid")],
  validateRequest,
  (req: Request, res: Response) => {
    const { username } = req.body;

    if (!cache.has(username)) {
      const apiKey = randomApiKey(16);
      cache.set(username, apiKey);
    } else {
      throw new BadRequestError("This user has already registered");
    }

    res.status(201).send({ apiKey: cache.get(username) });
  }
);

export { router as registerRouter };
