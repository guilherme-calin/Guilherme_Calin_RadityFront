import {UserRoles} from '../../../enums/user-roles.enum';

export type StoredUser = {
  id: number;
  name: string;
  role: UserRoles;
  employeeId: number | null;
}
