import {  BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { StoredUser } from './types/stored-user.type';
import { LocalStorageService } from '../../providers/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CommonStore {
  private readonly userSubject: BehaviorSubject<StoredUser | null>;
  private readonly tokenSubject: BehaviorSubject<string | null>;
  private readonly localStorageService: LocalStorageService;

  constructor(localStorageService: LocalStorageService) {
    this.userSubject = new BehaviorSubject<StoredUser | null>(null);
    this.tokenSubject = new BehaviorSubject<string | null>(null);
    this.localStorageService = localStorageService;
  }

  setUser(user: StoredUser | null): void {
    if (user) {
      this.localStorageService.setUser(user);
    } else {
      this.localStorageService.purgeUser();
    }

    this.userSubject.next(user);
  }

  setToken(token: string | null): void {
    if (token) {
      this.localStorageService.setToken(token);
    } else {
      this.localStorageService.purgeToken();
    }


    this.tokenSubject.next(token);
  }

  getUser(): StoredUser | null {
    return this.userSubject.getValue();
  }

  getToken(): string | null {
    return this.tokenSubject.getValue();
  }

  purgeAll() {
    this.setToken(null);
    this.setUser(null);
  }
}
