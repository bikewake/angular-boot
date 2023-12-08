import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'

export class ErrorData {
    status: any;
    timeStamp: Date;
    constructor(
        public message: string
    ) {
           this.timeStamp = new Date();
    }
}

@Injectable({
  providedIn: 'root'
})
export class ErrorLogHandlerService extends ErrorHandler {

  private static errorSubject:BehaviorSubject<ErrorData> = new BehaviorSubject<ErrorData>(new ErrorData(''));

  constructor() {
    super();
    console.log("Calling Handler Constructor...");
  }

  override handleError(error: any) {

      const errorData :ErrorData =  new ErrorData(error.message);

      if (error instanceof HttpErrorResponse) {
            //Backend returns unsuccessful response codes such as 404, 500 etc.
            errorData.status = error.status;
      } else {
            //A client-side or network error occurred.
            errorData.status = "client";
      }
      ErrorLogHandlerService.errorSubject.next(errorData);
  }

  public errorData() : Observable<ErrorData> {
      return ErrorLogHandlerService.errorSubject;
  }

}
