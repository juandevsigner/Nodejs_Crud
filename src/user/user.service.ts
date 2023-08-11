import { logger } from '../utils/logger';
import { BaseService } from '../config/base.service';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { createHashValue } from '../utils/hash';

class UserService extends BaseService<UserEntity> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    super(UserEntity);
  }

  /**
   * getAllUsers
   */
  public async getAllUsers(): Promise<UserEntity[]> {
    logger.info(`${UserService.name} - getAllUsers`);
    const users = await (await this.useRepository).find();
    return users;
  }

  /**
   * getUserById
   */
  public async getUserById(uId: string): Promise<UserEntity | null> {
    logger.info(`${UserService.name} - getUserById with id ${uId}`);
    const user = await (await this.useRepository).findOneBy({ id: uId });
    if (!user) {
      console.log('Error no se encontro el usuario');
    }

    return user;
  }

  /**
   * createUser
   */
  public async createUser(userBody: UserDTO): Promise<UserEntity> {
    logger.info(`${UserService.name} - createUser`);
    const { password } = userBody;
    const hashedPsw = await createHashValue(password);
    const newUser = await (await this.useRepository).create({ ...userBody, password: hashedPsw });
    return (await this.useRepository).save(newUser);
  }

  /**
   * updateUserById
   */
  public async updateUserById(id: string, updateUserBody: UserDTO): Promise<UpdateResult> {
    logger.info(`${UserService.name} - updateUserById with id ${id}`);
    const findUser = await (await this.useRepository).findOneBy({ id });
    if (!findUser) {
      console.log('el usuario no EXISTE!!!');
    }
    return await (await this.useRepository).update(id, { ...updateUserBody });
  }

  /**
   * deleteUserById
   */
  public async deleteUserById(id: string): Promise<DeleteResult> {
    logger.info(`${UserService.name} - deleteUserById with id ${id}`);
    const findUser = await (await this.useRepository).findOneBy({ id });
    if (!findUser) {
      console.log('el usuario no EXISTE!!!');
    }

    return await (await this.useRepository).delete({ id });
  }
}

export default UserService;
