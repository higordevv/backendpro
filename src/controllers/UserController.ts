import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import type { User } from "@prisma/client";
import { Hash } from "../utils/bycript";
import { decode } from "jsonwebtoken";
import { ExtractJwt } from "../utils/extractToken";

export default new (class UserController {
  async createUser(req: Request<User>, res: Response) {
    try {
      const { name, email, username, password }: User = req.body;

      const emailExist = await prismaClient.user.findUnique({
        where: { email },
      });
      if (emailExist)
        return res.status(401).json({ message: "Email já cadastrado" });

      const userExsist = await prismaClient.user.findUnique({
        where: { username },
      });
      if (userExsist)
        return res.status(401).json({ message: "User já cadastrado" });


  
      const user = await prismaClient.user.create({
        data: {
          username,
          updateAt: new Date(),
          password: await Hash(password),
          name,
          email,
        },
      });

      return res.status(200).json(user);
    } catch (e) {
      return res.status(400);
    }
  }

  async findUser(req: Request, res: Response) {
    try {
      const token = ExtractJwt(req);
      if (!token) return res.status(401);
      const { id } = decode(token) as any;
      const user = await prismaClient.user.findUnique({
        where: { id: Number(id) },
      });
      if (typeof user === null) return res.status(400);
      return res.json(user);
    } catch (e) {
      return res.status(400);
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const token = ExtractJwt(req);
      if (!token) return res.status(401);
      const { id } = decode(token) as any;
      const { name, email, password, username }: User = req.body;

      const hashedPassword = await Hash(password);

      const user = await prismaClient.user.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          password: hashedPassword,
          username,
        },
      });

      return res.json(user);
    } catch (e) {
      return res.status(400);
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const token = ExtractJwt(req);
      if (!token) return res.status(401);
      const { id } = decode(token) as any;
      const userDeletd = await prismaClient.user.delete({
        where: { id: Number(id) },
      });
      res.clearCookie("token");
      return res.json({ message: "Conta deletada com sucesso" });
    } catch (e) {
      return res.status(400);
    }
  }
})();
