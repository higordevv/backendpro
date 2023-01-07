import { Request } from "express";

export function ExtractJwt(req: Request) {
  const authorization = req.headers["authorization"] as string;
  const token = authorization?.split(" ")[1];
  return token;
}
