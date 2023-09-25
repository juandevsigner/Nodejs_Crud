import { Router } from 'express';
import UserController from '../user/user.controller';
import { BaseRoute } from '../shared/router/base.router';
import { ValidateMiddlewareDTO } from '../shared/middleware/validate-dto.middleware';
import { UserDTO } from '../user/dto/user.dto';

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: user id
 *        name:
 *          type: string
 *          description: user name
 *        lastname:
 *          type: string
 *          description: user lastname
 *        role:
 *          type: string
 *          description: user role
 *        email:
 *          type: string
 *          description: user email
 *        createdAt:
 *          type: string
 *          format: date
 *          description: user created
 *      example:
 *        id: 5
 *        name: Juanda
 *        lastName: Monsalves
 *        role: USER
 *        email: emmanuel@gmail.com
 *        gender: m
 *        createdAt: 2023-08-11T20:32:22.657Z
 *        updateAt: 2023-08-11T21:16:35.000Z
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Endpoint
 */
class UserRoute extends BaseRoute<UserController, ValidateMiddlewareDTO> {
  public path = '/users';
  public router = Router();
  public userController = new UserController();

  constructor() {
    super(UserController, ValidateMiddlewareDTO);
    this.initUserRoute();
  }

  /**
   * initUserRoute
   */
  public initUserRoute() {
    /**
     * @swagger
     * /api/v1/users:
     *  get:
     *    summary: get all users
     *    tags: [User]
     *    responses:
     *      200:
     *        description: users access token
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#components/schemas/Users'
     *              description: array of Users
     *      500:
     *        description: server side error
     */
    this.router.get(`${this.path}`, (req, res) => this.userController.getAllUsers(req, res));
    /**
     * @swagger
     * /api/v1/users/{id}:
     *  get:
     *    summary: get user by id
     *    tags: [User]
     *    responses:
     *      200:
     *        description: ok
     *      404:
     *        description: user dont find
     *      500:
     *        description: server side error
     */
    this.router.get(`${this.path}/:id`, (req, res) => this.userController.getUserById(req, res));

    this.router.get(`${this.path}/rel/:id`, (req, res) => this.userController.getUserByIdWithRel(req, res));

    this.router.post(
      `${this.path}`,
      (req, res, next) => [this.middleware.validator(req, res, next, UserDTO)],
      (req, res) => this.userController.createUser(req, res),
    );

    this.router.put(
      `${this.path}/:id`,
      this.middleware.passAuth('jwt'),
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
      (req, res) => this.userController.updateUserById(req, res),
    );

    this.router.delete(
      `${this.path}/:id`,
      this.middleware.passAuth('jwt'),
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
      (req, res) => this.userController.deleteUserById(req, res),
    );
  }
}

export default UserRoute;
