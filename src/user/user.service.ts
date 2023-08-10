import { UpdateResult } from 'typeorm';
import { BaseService } from '../config/base.service';
import { logger } from '../utils/logger';
import { UserEntity } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';

class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    logger.info(`${UserService.name} - getAllUsers`);
    const users = await (await this.useRepository).find();
    return users;
  }

  public async getUserByID(uId: string): Promise<UserEntity | null> {
    logger.info(`${UserService.name} - getUserById`);
    const user = await (await this.useRepository).findOneBy({ id: uId });
    if (!user) {
      console.log('dont found user');
    }
    return user;
  }

  public async createUser(userBody: UserDTO) {
    logger.info(`${UserService.name} - createUser`);
    const newUser = await (await this.useRepository).create(userBody);
    return (await this.useRepository).save(newUser);
  }

  public async updateUserByID(id: string, updateUserBody: UserDTO): Promise<UpdateResult | null> {
    logger.info(`${UserService.name} - updateUserByID`);
    const findUser = await (await this.useRepository).findOneBy({ id });
    if (!findUser) {
      console.log('dont find user');
    }
    return await (await this.useRepository).update(id, { ...updateUserBody });
  }
  public async deleteUserByID(id: string) {
    logger.info(`${UserService.name} - deleteUserByID`);
    const findUser = await (await this.useRepository).findOneBy({ id });
    if (!findUser) {
      console.log('dont find user');
    }
    return await (await this.useRepository).delete({ id });
  }
}

export default UserService;
