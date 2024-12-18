export type AddressResponseDTO = {
  id: number;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  zipCode: string;
  countryIsoCode: string;
  addressTypeId: number;
}
