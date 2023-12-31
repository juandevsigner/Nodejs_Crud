import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { RoleType } from '../types/user.type';

export class UserDTO {
  @IsOptional()
  id!: string;

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  lastName!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  gender!: string;

  @IsNotEmpty()
  role!: RoleType;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updateAt!: Date;
}
