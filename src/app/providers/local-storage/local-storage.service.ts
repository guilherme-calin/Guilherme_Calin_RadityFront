import { Injectable } from '@angular/core';
import {StoredUser} from '../../stores/user/types/stored-user.type';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  readonly USER_STORAGE_FIELD_NAME = 'user';
  readonly TOKEN_STORAGE_FIELD_NAME = 'token';

  setUser(user: StoredUser): void {
    localStorage.setItem(this.USER_STORAGE_FIELD_NAME, JSON.stringify(user));
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_STORAGE_FIELD_NAME, token);
  }

  getUser(): StoredUser | null {
    const result = localStorage.getItem(this.USER_STORAGE_FIELD_NAME);

    if (!result) return null;

    return JSON.parse(result) as StoredUser;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_STORAGE_FIELD_NAME);
  }

  purgeUser(): void {
    localStorage.removeItem(this.USER_STORAGE_FIELD_NAME);
  }

  purgeToken(): void {
    localStorage.removeItem(this.TOKEN_STORAGE_FIELD_NAME);
  }
}
