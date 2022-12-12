import { Request, Response } from "express";

import { prismaClient } from "../../database/prismaClient";

class FindUserController {
  async handler(request: Request, response: Response) {
    const { id } = request.params;
    const user = prismaClient.user.findUnique({
      where: { id: Number(id) },
    });
    return response.json(user);
  }
}

export default new FindUserController().handler;
