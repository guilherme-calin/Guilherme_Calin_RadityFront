import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {HttpBaseUrlInterceptor} from './interceptors/http-base-url.interceptor';
import {HttpAuthorizedRequestInterceptor} from './interceptors/authorized-request.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([HttpBaseUrlInterceptor, HttpAuthorizedRequestInterceptor])
    ),
  ]
};
