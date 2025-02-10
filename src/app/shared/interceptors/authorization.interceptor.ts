import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

type TKRefreshResp = {
  access: string;
};

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) {}

  private isRefreshing = false;
  private rtkSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let req = request;
    const tk = this.tokenStorageService.getAuthToken();
    if (tk !== null) {
      req = this.addAuthorizationHeader(req, tk!);
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          !req.url.includes('api/token/') &&
          !req.url.includes('api/register/') &&
          !req.url.includes('api/verify-is-prof/') &&
          err.status === 401
        ) {
          return this.handleUnAuthroized(req, next);
        }
        return throwError(() => err);
      })
    );
  }

  private handleUnAuthroized(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.rtkSubject.next(null);
      this.authService.refreshAuthToken().subscribe({
        next: (res) => {
          this.isRefreshing = false;
          this.tokenStorageService.updateAuthToken(
            (res as TKRefreshResp).access
          );
          this.rtkSubject.next((res as TKRefreshResp).access);
        },
        error: (err) => {
          console.error(err);
          this.isRefreshing = false;
          this.tokenStorageService.clearTokens();
          return throwError(() => err);
        },
      });
    }
    return this.rtkSubject.pipe(
      filter((v) => v !== null),
      take(1),
      switchMap((v) => next.handle(this.addAuthorizationHeader(request, v!)))
    );
  }

  private addAuthorizationHeader(
    req: HttpRequest<unknown>,
    tk: string
  ): HttpRequest<unknown> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tk}`),
    });
  }
}

export const AUTH_INTERCEPTOR_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true,
    
  },
];
