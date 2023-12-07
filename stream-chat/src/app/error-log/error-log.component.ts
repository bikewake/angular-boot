import { Component, ViewChild, ElementRef } from '@angular/core';
import { ErrorLogService, ErrorData } from '../error-log.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-log.component.html',
  styleUrl: './error-log.component.css'
})
export class ErrorLogComponent {

  @ViewChild('scrollFrame', { static: true }) scrollFrameRef!: ElementRef;
  messageSize: number = 0;

  constructor(private readonly errorLogService: ErrorLogService) {
  }

  ngAfterViewChecked() {
      // After the view is checked, scroll to the bottom
      if(this.messageList().length > this.messageSize) {
        this.messageSize = this.messageList().length;
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

  messageList(): Array<ErrorData> {
    const errorList = this.errorLogService.errorList();
    console.log('Error List:', errorList);
    return errorList;
  }
}
