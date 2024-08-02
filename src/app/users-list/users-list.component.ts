import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { userInterface } from '../interface/userInterface';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  user = { id: 12 };
  users!: userInterface[];
  currentPage: BehaviorSubject<number> = new BehaviorSubject(1);
  page: number = 1;
  totalPages: number[] = [1, 2];
  errorMessage: string = '';

  constructor(
    private _userServ: UsersService,
    private _searchServ: SearchService
  ) {}

  ngOnInit(): void {
    this.currentPage.subscribe((newPage) => {
      this._userServ.getAllUsers(newPage).subscribe((response) => {
        this.users = response;
        this.errorMessage = '';
      });
    });
    this.currentPage.next(this.page);

    this._searchServ.searchTerm.subscribe((term) => {
      if (term) {
        this.searchById(term);
      } else {
        this._userServ.getAllUsers(this.page).subscribe((response) => {
          this.users = response;
          this.errorMessage = '';
        });
      }
    });
  }

  nextPage() {
    if (this.page < this.totalPages.length) {
      this.page++;
      this.currentPage.next(this.page);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.currentPage.next(this.page);
    }
  }

  goToPage(page: number) {
    this.page = page;
    this.currentPage.next(this.page);
  }

  searchById(userId: string) {
    this._userServ.getUserById(userId).subscribe(
      (user) => {
        console.log(user);
        this.users = [user.data];
        this.errorMessage = '';
      },
      (err) => {
        this.users = [];
        this.errorMessage =
          'User not found. Please check the ID and try again.';
      }
    );
  }
  getStyles() {
    return {
      width: this.user.id === 12 ? '111px' : '100px',
      height: this.user.id === 12 ? '96px' : 'auto',
    };
  }
}
