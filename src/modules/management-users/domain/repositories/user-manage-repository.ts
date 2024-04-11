import { County } from '../entities/county';
import { Gender } from '../entities/gender';
import { Role } from '../entities/role';
import { UserManage } from '../entities/userManage';

export type UserManageRepository = {
  getUsers(params: { completeName: string }): Promise<UserManage[]>;
  getGender(): Promise<Gender[]>;
  getCounty(): Promise<County[]>;
  getRole(): Promise<Role[]>;
};
