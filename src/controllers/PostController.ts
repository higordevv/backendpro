import { Request, Response } from "express";

class PostController {
  async createPost(req: Request, res: Response) {}
  async updatePost(req: Request, res: Response) {}
  async findPost(req: Request, res: Response) {}
  async deletePost(req: Request, res: Response) {}
}

export default new PostController();
