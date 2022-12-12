import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const userDeletd = await prismaClient.user.delete({
      where: { id: Number(id) },
    });

    response.send(`O user ${userDeletd.name} foi deletado`);
    return response.json(userDeletd);
  }
}

export default new DeleteUserController().handle;
