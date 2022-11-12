import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const TIME_CHECK = new HttpContextToken<boolean>(() => false);

export function checkTime() {
  return new HttpContext().set(TIME_CHECK, true);
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(TIME_CHECK)) {
      const start = performance.now();
      return next.handle(request).pipe(
        tap(() => {
          const time = (performance.now() - start) + 'ms';
          // console.log(request.url, time);
        })
      );
    }
    return next.handle(request);
  }
}
