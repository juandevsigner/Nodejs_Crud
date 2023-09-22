import { logger } from '../utils/logger';
import { BaseService } from '../config/base.service';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { createHashValue } from '../utils/hash';
import { RoleType } from './types/user.type';

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

  public async getUserByIdWithRel(uid: string): Promise<UserEntity | null | undefined> {
    try {
      const user = await (await this.useRepository)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.customer', 'customer')
        .where({ id: uid })
        .getOne();

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserByIdWithRol(uid: string, role: RoleType): Promise<UserEntity | null | undefined> {
    try {
      const user = await (await this.useRepository)
        .createQueryBuilder('user')
        .where({ id: uid })
        .andWhere({ role })
        .getOne();

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  public async findUserByEmail(email: string): Promise<UserEntity | null | undefined> {
    try {
      const findUser = (await this.useRepository)
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ email })
        .getOne();

      return findUser;
    } catch (error) {
      console.log(error);
    }
  }

  public async findUserByUserName(name: string): Promise<UserEntity | null | undefined> {
    try {
      const findUser = (await this.useRepository)
        .createQueryBuilder('user')
        .addSelect('user.name')
        .where({ name })
        .getOne();

      return findUser;
    } catch (error) {
      console.log(error);
    }
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
