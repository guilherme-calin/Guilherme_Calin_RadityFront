import {Injectable} from '@angular/core';
import {ToastInput} from './types/toast-input.type';
import {ToastClassType} from './enums/toast-class.type';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: ToastInput[] = [];

  showSuccess(header: string, body: string, delay: number = 5000) {
    this.toasts.push({ header, body, delay, type: ToastClassType.Success });
  }

  showError(header: string, body: string, delay: number = 5000) {
    this.toasts.push({ header, body, delay, type: ToastClassType.Error });
  }

  remove(toast: ToastInput) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
