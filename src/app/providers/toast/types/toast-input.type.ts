import {ToastClassType} from '../enums/toast-class.type';

export type ToastInput = {
  header: string;
  body: string;
  delay: number;
  type: ToastClassType;
}
