import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthenticateUserResponseDTO } from './dtos/authenticate-user-response.dto';
import { AuthenticateUserRequestDTO } from './dtos/authenticate-user-request.dto';
import { lastValueFrom } from 'rxjs';
import { CommonStore } from '../../stores/user/common-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly httpClient: HttpClient;
  private readonly commonStore: CommonStore;

  constructor(
    httpClient: HttpClient,
    commonStore: CommonStore
  ) {
    this.httpClient = httpClient;
    this.commonStore = commonStore;
  }

  async authenticate(username: string, password: string): Promise<AuthenticateUserResponseDTO> {
    const payload: AuthenticateUserRequestDTO = {
      login: username,
      password
    }

    const response = await lastValueFrom(this.httpClient.post('/authentication', payload));

    return response as AuthenticateUserResponseDTO;
  }

  updateStore(payload: AuthenticateUserResponseDTO): void {
    this.commonStore.setToken(payload.token);
    this.commonStore.setUser({
      id: payload.id,
      name: payload.name,
      role: payload.role,
      employeeId: payload.employeeId
    });
  }
}
