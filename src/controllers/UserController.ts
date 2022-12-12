import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export default new (class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
        },
      });
      return res.json(user);
    } catch (e) {
      return res.status(400);
    }
  }
  async findAllUsers(req: Request, res: Response) {
    try {
      const users = await prismaClient.user.findMany();
      return res.json(users);
    } catch (e) {
      return res.status(400);
    }
  }
  async findUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prismaClient.user.findUnique({
        where: { id: Number(id) },
      });
      return res.json(user);
    } catch (e) {
      return res.status(400);
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      const user = await prismaClient.user.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
        },
      });
    } catch (e) {
      return res.status(400);
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userDeletd = await prismaClient.user.delete({
        where: { id: Number(id) },
      });
      return res.json(userDeletd);
    } catch (e) {
      return res.status(400);
    }
  }
})();
