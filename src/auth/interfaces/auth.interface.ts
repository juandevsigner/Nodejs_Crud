import { RoleType } from '../../user/types/user.type';

export interface PayloadToken {
  role: RoleType;
  sub: string;
}
