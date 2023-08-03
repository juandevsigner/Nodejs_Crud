import { Router, Request, Response } from "express";
import { Routes } from "../interfaces/route.interface";

class BaseRoute implements Routes {
  public path?: "/alive";
  public router = Router();

  constructor() {
    this.initBaseRoute();
  }

  public initBaseRoute() {
    this.router.get(`/alive`, (_req: Request, res: Response) => {
      res.status(200).json({ ok: true, message: "HOLI" });
    });
  }
}

export default BaseRoute;
