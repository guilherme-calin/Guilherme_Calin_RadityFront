import { UserRoles } from '../../../enums/user-roles.enum';

export type AuthenticateUserResponseDTO = {
  id: number;
  token: string;
  name: string;
  role: UserRoles;
  employeeId: number | null;
}
