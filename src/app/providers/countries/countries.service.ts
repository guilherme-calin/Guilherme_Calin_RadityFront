import {Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {CommonStore} from '../../stores/user/common-store.service';
import {lastValueFrom} from 'rxjs';
import {AUTHORIZED_REQUEST_CONTEXT} from '../../interceptors/authorized-request.interceptor';
import {CountryResponseDTO} from './dtos/country-response.dto';
import {Country} from '../../entities/country.entity';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly httpClient: HttpClient;
  private readonly commonStore: CommonStore;

  constructor(
    httpClient: HttpClient,
    commonStore: CommonStore
  ) {
    this.httpClient = httpClient;
    this.commonStore = commonStore;
  }

  async getAll(): Promise<Country[]> {
    const response = await lastValueFrom(this.httpClient.get('/countries', { context: new HttpContext().set(AUTHORIZED_REQUEST_CONTEXT, true) }));
    const responsePayload= response as CountryResponseDTO[];

    return responsePayload.map((apiItem) => {
      return {
        ...apiItem
      }
    });
  }
}
