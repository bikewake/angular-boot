import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { server } from '../../environment';

@Component({
  selector: 'app-bike',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bike.component.html',
  styleUrl: './bike.component.css'
})
export class BikeComponent {
  helloText = '';

  constructor(private httpClient: HttpClient) { }

  getHelloText() {
    this.httpClient.get<{ message: string }>(server.url + 'hello').subscribe(result => {
      this.helloText = result.message;
    });
  }

}
