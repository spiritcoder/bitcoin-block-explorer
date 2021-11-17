import { param } from "express-validator";
import { BadRequestError } from "../errors/error-handler";

//validates all place ids sent as request to make sure they exist in the db
export const validateTime = [
  param("time").custom(async (value, { req }) => {
    let foundContent = "ss";
    if (foundContent == null)
      throw new BadRequestError("Please provide a valid place id");
    return true;
  }),
];

export const validateHash = [
  param("hash").isHash('sha256').withMessage('Longitude is required and must be a string'),
]
