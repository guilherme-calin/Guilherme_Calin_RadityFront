import {AddressResponseDTO} from '../../addresses/dtos/address-response.dto';

export type EmployeeDetailsResponseDTO = {
  id: number;
  firstName: string;
  lastName: string;
  startDate: string;
  jobTitle: string;
  birthDate: string;
  addresses: AddressResponseDTO[];
}
