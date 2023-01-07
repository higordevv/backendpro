import express, { Express } from "express";
import token from "./routes/token";
import User from "./routes/user";
import cors from "cors";

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
    this.app.use("/login", token);
    this.app.use("/user", User);
  }
}

export default new App().app;
