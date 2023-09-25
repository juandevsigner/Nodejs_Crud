import { Router } from 'express';
import { AuthController } from '../auth/controller/auth.controller';

import { BaseRoute } from '../shared/router/base.router';
import { SharedMiddleware } from '../shared/middleware/shared.middleware';

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Endpoint
 */
export class AuthRoutes extends BaseRoute<AuthController, SharedMiddleware> {
  public router = Router();
  public authController: AuthController = new AuthController();
  constructor() {
    super(AuthController, SharedMiddleware);
    this.initAuthRoutes();
  }

  public initAuthRoutes() {
    /**
     * @swagger
     * /api/v1/login:
     *  post:
     *    summary: Login access token
     *    tags: [Auth]
     *    responses:
     *      200:
     *        description: Login access token
     *      500:
     *        description: server side error
     */
    this.router.post('/login', this.middleware.passAuth('login'), (req, res) => this.authController.login(req, res));
  }
}

export default AuthRoutes;
