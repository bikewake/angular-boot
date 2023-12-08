import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,  RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  RouterLink, RouterLinkActive,
            MatIconModule, MatDividerModule, MatMenuModule, MatToolbarModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'speak-stream';

  isLoggedIn = false;

    public login() {
//      this.keycloak.login();
    }

    public logout() {
//      this.keycloak.logout();
    }
}
