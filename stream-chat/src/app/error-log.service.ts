import { Injectable, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
export class ErrorLogService extends ErrorHandler {

  errorDataList: Array<ErrorData> = [];

  constructor(private router : Router) {
    super();
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
      console.log(errorData);
      this.errorDataList.push(errorData);
      console.log(this.errorList());
      this.router.navigate(['/error']);
  }

  errorList():Array<ErrorData>{
      return this.errorDataList;
  }

}
