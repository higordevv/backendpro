import express, { Express } from "express";
import token from "./routes/token";
import User from "./routes/user";
import cors from "cors";
import JwtMiddleware from "./middlewares/JwtMiddleware";

class App {
  readonly app: Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  routes() {
    this.app.use("/tokens/", token);
    this.app.use("/user/", User);
  }
}

export default new App().app;
