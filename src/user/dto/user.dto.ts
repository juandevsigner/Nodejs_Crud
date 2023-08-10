import { IsOptional, IsNotEmpty, IsDate } from 'class-validator';

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

  @IsDate()
  @IsOptional()
  updateAt!: Date;

  @IsDate()
  @IsOptional()
  createdAt!: Date;
}
