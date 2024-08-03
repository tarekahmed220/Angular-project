import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlexCenterDirective } from '../CustomeDirectives/flex-center.directive';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [FlexCenterDirective],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
