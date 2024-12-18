import { Component } from '@angular/core';
import {ToastService} from '../providers/toast/toast.service';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import {ToastClassType} from '../providers/toast/enums/toast-class.type';

@Component({
  selector: 'app-toast-handler',
  imports: [
    NgbToast
  ],
  templateUrl: './toast-handler.component.html',
  standalone: true,
  styleUrl: './toast-handler.component.scss'
})
export class ToastHandlerComponent {
  readonly toastService: ToastService;

  constructor(toastService: ToastService) {
    this.toastService = toastService;
  }

  protected readonly ToastClassType = ToastClassType;
}
