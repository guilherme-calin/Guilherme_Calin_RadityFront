import { Injectable} from '@angular/core';
import { HttpClient, HttpContext} from '@angular/common/http';
import { lastValueFrom} from 'rxjs';
import { AUTHORIZED_REQUEST_CONTEXT} from '../../interceptors/authorized-request.interceptor';
import { AddressType} from '../../entities/address-type.entity';
import { AddressTypeResponseDTO} from './dtos/address-type-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {
  private readonly httpClient: HttpClient;

  constructor(
    httpClient: HttpClient,
  ) {
    this.httpClient = httpClient;
  }

  async getAllTypes(): Promise<AddressType[]> {
    const response = await lastValueFrom(this.httpClient.get('/addresses/types', { context: new HttpContext().set(AUTHORIZED_REQUEST_CONTEXT, true) }));
    const responsePayload= response as AddressTypeResponseDTO[];

    return responsePayload.map((apiItem) => {
      return {
        ...apiItem
      }
    });
  }
}
