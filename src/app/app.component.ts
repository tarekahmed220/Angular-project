import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { UsersListComponent } from './users-list/users-list.component';
import { Router, Event, NavigationEnd } from '@angular/router';
import { FlexCenterDirective } from './CustomeDirectives/flex-center.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    UsersListComponent,
    FlexCenterDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'usersList';
}
