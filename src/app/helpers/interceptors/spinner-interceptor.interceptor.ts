import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingSpinnerService } from '@app/components/loading-spinner/services/loading-spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptorInterceptor implements HttpInterceptor {

  constructor(private loadingSpinnerServices: LoadingSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingSpinnerServices.show();//muestra el loading al hacer la peticion
    return next.handle(request).pipe(
      finalize(() => this.loadingSpinnerServices.hide())//oculta el spinner al finalizar la peticion
    );
  }
}
