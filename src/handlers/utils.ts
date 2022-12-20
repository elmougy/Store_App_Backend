import express from "express";
import jwt, { Secret } from "jsonwebtoken";
const SECRET = process.env.TOKEN_SECRET;

export function verifyAuthToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void | boolean {
  if (!req.headers.authorization) {
    res.status(401);
    res.json("no token received ...");
    return;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, SECRET as Secret);
    next();
  } catch (err) {
    console.error(err);
    res.status(401);
    res.json("invalid token...");
    return;
  }
}
