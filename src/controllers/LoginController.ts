import { Request, Response } from "express";
import type { User } from "@prisma/client";
import { prismaClient } from "../database/prismaClient";
import { VerifyHash } from "../utils/bycript";
import jwt from "jsonwebtoken";

class LoginController {
  async store(req: Request, res: Response) {
    const { email, password }: User = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Credenciais invalidas",
      });
    }

    // Recebo o email do Body da Request, mas só pego isso do banco { senha, username e id}
    const user = await prismaClient.user.findUnique({
      where: { email }
    });

    // Dai verifico pelo user
    if (!user?.username) {
      console.log(user)
      return res.status(401).json({
        message: "Usuario não existe",
      });
    }

    // Depois vejo a senha 
    if (!(await VerifyHash(password, user?.password))) {
      return res.status(401).json({ message: "Senha invalida" });
    }

    // Se tudo der certo, pego o id e email pra assinar no JWT
    const { id } = user;
    const secret = process.env.TOKEN_SECRET as string;
    const token = jwt.sign({ id, email }, secret, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60, // 1 Hour
    });
    return res.json({ token: token, message: "Tu tá logado aqui" });
  }
}

export default new LoginController().store;
