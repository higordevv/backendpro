import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../../database/prismaClient";

class UpdateUserController {
  async handler(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email } = request.body;

    const user = await prismaClient.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
      },
    });
    if ((request.statusCode = 200))
      console.log(`User ${user.name} atualizado com sucesso`);
    return response.json(user);
  }
}

export default new UpdateUserController().handler;
