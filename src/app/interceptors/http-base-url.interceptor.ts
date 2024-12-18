import { environment } from '../../environments/environment';
import {HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

const baseURL = environment.apiURL;

export function HttpBaseUrlInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const apiRequest = request.clone({
        url: `${baseURL}${request.url}`,
    });

    return next(apiRequest);
}
