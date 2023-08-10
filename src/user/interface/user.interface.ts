export interface IUser {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updateAt?: Date;
}
