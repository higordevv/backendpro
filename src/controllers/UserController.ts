import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import type { User } from "@prisma/client";
import { Hash } from "../utils/bycript";


export default new (class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const {name,email, username, password }: User = req.body;
      
      const userExsist = await prismaClient.user.findUnique({where:{ email, username}})
      
      if(userExsist) {
        return res.status(401).json({message: "Esse usuario já existe"})
      } else {
        
        const user = await prismaClient.user.create({
          data: {
            username,
            password: await Hash(password),
            name,
            email,
          },
        });
  
        return res.json(user);
      }
      
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
      
      const {name , email, password, username }: User = req.body;

      const hashedEmail = await Hash(email)
      const hashedPassword = await Hash(password)

      const user = await prismaClient.user.update({
        where: { id: Number(id)},
        data: {
          name,
          email: email,
          password: hashedPassword,
          username
        },
      });

      return res.json(user)
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
