import express, { Request, Response } from "express";
import { param } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { randomApiKey } from "../services/generate-key";

const router = express.Router();

router.post(
  "/register/:userName",
  [param("userName").isString().withMessage("User must be valid")],
  validateRequest,
  (req: Request, res: Response) => {
    const { userName } = req.params;

    let userSession = req.session?.user;

    // User doesn't exist or new user comming from request.
    if (!userSession || Object.keys(userSession)[0] !== userName) {
      const apiKey = randomApiKey(16);

      req.session = {
        user: { [userName]: apiKey },
      };

      userSession = req.session.user;
    } else {
      throw new BadRequestError("This user has already registered");
    }

    res.status(201).send({ apiKey: req.session?.user });
  }
);

export { router as registerRouter };
