import {CreateAddressRequestDTO} from '../../addresses/dtos/create-address-request.dto';

export type CreateEmployeeRequestDTO = {
  firstName: string;
  lastName: string;
  startDate: string;
  jobTitle: string;
  birthDate: string;
  addresses: CreateAddressRequestDTO[];
}
