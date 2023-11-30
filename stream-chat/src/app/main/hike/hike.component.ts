import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { server } from '../../environment';

@Component({
  selector: 'app-hike',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hike.component.html',
  styleUrl: './hike.component.css'
})
export class HikeComponent {

  helloText = '';

  constructor(private httpClient: HttpClient) { }

  getHelloText() {
    this.httpClient.get<{ message: string }>(server.url + 'hello').subscribe(result => {
      this.helloText = result.message;
    });
  }


}
