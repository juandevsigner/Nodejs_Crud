import { Request, Response } from 'express';
import UserService from './user.service';

class UserController {
  constructor(private readonly userService: UserService = new UserService()) {}

  public getAllUser = async (_req: Request, res: Response) => {
    const userResponse = await this.userService.getAllUsers();
    return res.status(200).json({ ok: true, users: userResponse });
  };

  public getUserById = async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    const user = await this.userService.getUserByID(userId);
    return res.status(200).json({
      ok: true,
      user,
      message: `user's detail`,
    });
  };

  public createUser = async (req: Request, res: Response) => {
    const { body: userBody } = req;
    const newUser = await this.userService.createUser(userBody);
    return res.status(200).json({
      ok: true,
      message: `user was create succesfully`,
      user: newUser,
    });
  };

  public updateUserById = async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    const { body: userBody } = req;
    const updatedUser = await this.userService.updateUserByID(userId, userBody);
    res.status(200).json({
      ok: true,
      message: 'User was update',
      user: updatedUser,
    });
  };

  public deleteUserbyId = async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    const userDeleted = await this.userService.deleteUserByID(userId);
    res.status(200).json({
      ok: true,
      message: `User Id:${userDeleted} was removed`,
    });
  };
}

export default UserController;
