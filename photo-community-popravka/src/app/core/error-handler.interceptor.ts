import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageBusService, MessageType } from './message-bus.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  //error-handler interceptora slusha za greshki 

  constructor(private messageBus: MessageBusService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      this.messageBus.notifyForMessage({
        text: err?.error?.message || 'No error message but an error occured!',
        type: MessageType.Error
        //parsvame syobshtenieto
      })
      
      return throwError(err);
      // kazvam na headeara che ima greshka 
    }));
  }
}
