import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email } = request.body;
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
      },
    });
    // response.send(`O usuario ${user.name} foi criado`);
    return response.json(user);
    
  }
}

export default new CreateUserController().handle;
