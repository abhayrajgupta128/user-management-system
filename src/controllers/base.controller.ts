import { Request, Response } from "express";

class BaseController {
  public async index(req: Request, res: Response) {
    res.status(200).send("Hello World");
  }
}

export default new BaseController();
