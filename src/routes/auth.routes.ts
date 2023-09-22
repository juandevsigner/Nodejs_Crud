import { Router } from 'express';
import { AuthController } from '../auth/controller/auth.controller';

import { BaseRoute } from '../shared/router/base.router';
import { SharedMiddleware } from '../shared/middleware/shared.middleware';

export class AuthRoutes extends BaseRoute<AuthController, SharedMiddleware> {
  public router = Router();
  public authController: AuthController = new AuthController();
  constructor() {
    super(AuthController, SharedMiddleware);
    this.initAuthRoutes();
  }

  public initAuthRoutes() {
    this.router.post('/login', this.middleware.passAuth('login'), (req, res) => this.authController.login(req, res));
  }
}

export default AuthRoutes;
