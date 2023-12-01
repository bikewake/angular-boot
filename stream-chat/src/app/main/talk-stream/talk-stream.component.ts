import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { server } from '../../environment';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { EventSourcePolyfill } from 'ng-event-source';

export class PostMessage {
  constructor(
    public message: string
  ) {  }
}

export interface MessageData {
    sender: string;
    message: string;
    timeStamp: number;
}

@Component({
  selector: 'app-talk-stream',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule, FormsModule],
  templateUrl: './talk-stream.component.html',
  styleUrl: './talk-stream.component.css'
})
export class TalkStreamComponent  implements OnInit {

  chatMessage: PostMessage = new PostMessage("");

  messageList: Array<MessageData> = []

  constructor(private httpClient: HttpClient,
              protected readonly keycloak: KeycloakService
  ) { }

  public async ngOnInit() {
    const keyToken = this.keycloak.getToken();
    this.createEventSource(await keyToken).subscribe(
      (messageData: MessageData) => {
        if(messageData.message) {
          console.log('Message received: ' + messageData.message);
          this.messageList.push(messageData);
        }
      }
    );
  }

  sendMessage() {
      const headers = { 'Content-Type': 'application/json' };
      const body = { message: this.chatMessage.message };
      this.httpClient.post<{ message: string }>(server.url + 'api/chat', body, {headers}).subscribe(
        ()=> this.chatMessage.message = "");
  }

  createEventSource(keyToken: string): Observable<MessageData> {

      console.log('Token: ' + keyToken);
      const keyHeader = { 'Authorization': 'Bearer ' + keyToken};
      const eventSource = new EventSourcePolyfill(server.url + 'api/sse-chat',
      {headers: { Authorization: 'Bearer ' + keyToken}} );

      return new Observable(observer => {
          eventSource.onmessage = event => {
            const messageData: MessageData = JSON.parse(event.data);
            observer.next(messageData);
        };
      });
   }
}
