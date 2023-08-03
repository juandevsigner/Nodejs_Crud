import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import UserController from '../user/user.controller';

class UserRoutes implements Routes {
  public path? = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initUserRoutes();
  }

  public initUserRoutes() {
    this.router.get(`${this.path}`, this.userController.getAllUser);

    this.router.get(`${this.path}/:id`, this.userController.getUserById);

    this.router.post(`${this.path}`, this.userController.createUser);

    this.router.put(`${this.path}/:id`, this.userController.updateUserById);

    this.router.delete(`${this.path}/:id`, this.userController.deleteUserbyId);
  }
}
export default UserRoutes;
