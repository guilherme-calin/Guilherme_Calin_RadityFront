import { environment } from '../../environments/environment';
import {HttpContextToken, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {inject} from '@angular/core';
import {CommonStore} from '../stores/user/common-store.service';
import {Router} from '@angular/router';

export const AUTHORIZED_REQUEST_CONTEXT = new HttpContextToken<boolean>(() => true);

export function HttpAuthorizedRequestInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const router = inject(Router);
    const commonStore = inject(CommonStore);

    if (request.context.get(AUTHORIZED_REQUEST_CONTEXT) && commonStore.getToken()) {
      const newHeaders = request.headers.set('Authorization', 'Bearer ' + commonStore.getToken());
      const apiRequest = request.clone({
        headers: newHeaders
      });

      return next(apiRequest).pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          router.navigateByUrl('/login');
          return throwError(() => 'Unauthorized');
        }

        return throwError(() => error.message);
      }));
    }

  return next(request);
}
