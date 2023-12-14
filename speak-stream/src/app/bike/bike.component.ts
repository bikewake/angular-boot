import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalkStreamComponent } from '../talk-stream/talk-stream.component';

@Component({
  selector: 'app-bike',
  standalone: true,
  imports: [CommonModule, TalkStreamComponent],
  templateUrl: './bike.component.html',
  styleUrl: './bike.component.css'
})
export class BikeComponent {

}
