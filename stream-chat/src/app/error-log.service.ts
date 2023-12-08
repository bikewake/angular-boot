import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorData, ErrorLogHandlerService } from './error-log-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {

  constructor(private router : Router, private zone: NgZone, private errorLogHandlerService: ErrorLogHandlerService) {
    console.log("Calling Constructor...");
    this.errorLogHandlerService.errorData().subscribe( data =>
      this.zone.run(() => {
        this.router.navigate(['/error'])
      })
    );
  }

  public errorData() : Observable<ErrorData> {
      return this.errorLogHandlerService.errorData();
  }

}
