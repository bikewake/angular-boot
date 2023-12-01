import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { server } from '../../environment';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-talk-stream',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatToolbarModule, MatIconModule],
  templateUrl: './talk-stream.component.html',
  styleUrl: './talk-stream.component.css'
})
export class TalkStreamComponent {

    listItems: Array<{title: string}> = [
        { title: 'item 1' },
        { title: 'item 2' },
        { title: 'item 3' }
    ]

  constructor(private httpClient: HttpClient) { }

    getHelloText() {
      this.httpClient.get<{ message: string }>(server.url + 'hello').subscribe(result => {
        this.listItems.push({title: result.message});
      });
    }

    sendMessage() {

      const headers = { 'Content-Type': 'application/json' };
      const body = { message: "POST Request Example" };

      this.httpClient.post<{ message: string }>(server.url + 'api/chat', body, {headers}).subscribe(result => {
        this.listItems.push({title: 'push done'});
      });
    }

}
