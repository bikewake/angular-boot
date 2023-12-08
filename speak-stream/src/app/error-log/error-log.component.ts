import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ErrorLogService } from '../error-log.service';
import { ErrorData } from '../error-log-handler.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-log.component.html',
  styleUrl: './error-log.component.css'
})
export class ErrorLogComponent implements OnInit {

  errorDataList:Array<ErrorData> = [];

  @ViewChild('scrollFrame', { static: true }) scrollFrameRef!: ElementRef;
  messageSize: number = 0;

  constructor(private errorLogService :ErrorLogService) {
  }

  public async ngOnInit() {
          this.errorLogService.errorData().subscribe( (data:ErrorData) => this.errorDataList.push(data));
  }

  ngAfterViewChecked() {
      // After the view is checked, scroll to the bottom
      if(this.errorDataList.length > this.messageSize) {
        this.messageSize = this.errorDataList.length;
        this.scrollToBottom();
      }
  }

  scrollToBottom() {
        // Scroll to the bottom of the message area
        if (this.scrollFrameRef) {
          const scrollFrame = this.scrollFrameRef.nativeElement;
          scrollFrame.scrollTop = scrollFrame.scrollHeight;
        }
  }

}
