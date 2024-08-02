import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private _searchserv: SearchService) {}

  clearText(input: HTMLInputElement) {
    input.value = '';
  }
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this._searchserv.setSearchTerm(target.value);
    }
  }
}
