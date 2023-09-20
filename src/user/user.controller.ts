import { Request, Response } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
import { HttpResponse } from '../shared/response/http.response';
import { logger } from '../utils/logger';
import UserService from './user.service';

class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  public getAllUsers = async (_req: Request, res: Response) => {
    try {
      logger.info(`${UserController.name} - getAllUsers`);
      const usersResp = await this.userService.getAllUsers();
      return this.httpResponse.OK(res, usersResp);
    } catch (error) {
      return this.httpResponse.Error(res, 'Internal Server Error');
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      logger.info(`${UserController.name} - getUserById with id ${userId}`);
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return this.httpResponse.NotFound(res, 'User not found');
      }
      return this.httpResponse.OK(res, user);
    } catch (error) {
      return this.httpResponse.Error(res, 'Internal Server Error');
    }
  };

  public getUserByIdWithRel = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      logger.info(`${UserController.name} - getUserById with id ${userId}`);
      const user = await this.userService.getUserByIdWithRel(userId);
      if (!user) {
        return this.httpResponse.NotFound(res, 'User not found');
      }
      return this.httpResponse.OK(res, user);
    } catch (error) {
      return this.httpResponse.Error(res, 'Internal Server Error');
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      logger.info(`${UserController.name} - createUser`);
      const newUser = await this.userService.createUser(req.body);
      return this.httpResponse.OK(res, newUser);
    } catch (error) {
      return this.httpResponse.Error(res, 'Internal Server Error');
    }
  };

  public updateUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      logger.info(`${UserController.name} - updateUserById with id ${userId}`);

      const { body: userBody } = req;
      const updatedUser: UpdateResult = await this.userService.updateUserById(userId, userBody);
      if (!updatedUser.affected) {
        return this.httpResponse.NotFound(res, 'User not found');
      }
      return this.httpResponse.OK(res, updatedUser);
    } catch (error) {
      return this.httpResponse.Error(res, 'Internal Server Error');
    }
  };

  public deleteUserById = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.params;
      logger.info(`${UserController.name} - deleteUserById with id ${userId}`);
      const userDeleted: DeleteResult = await this.userService.deleteUserById(userId);
      if (!userDeleted?.affected) {
        return this.httpResponse.NotFound(res, 'User not found');
      }
      return this.httpResponse.OK(res, userDeleted);
    } catch (error) {
      return this.httpResponse.Error(res, 'Internal Server Error');
    }
  };
}

export default UserController;
