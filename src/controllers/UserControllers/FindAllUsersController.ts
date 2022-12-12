import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

class FindAllUsersController {
  async handle(request: Request, response: Response) {
    const users = await prismaClient.user.findMany();
    return response.json(users);
  }
}

export default new FindAllUsersController().handle;
