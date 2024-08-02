import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { userInterface } from '../interface/userInterface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  users!: userInterface;
  constructor(private _userServ: UsersService) {}

  ngOnInit(): void {
    const spans = document.querySelectorAll<HTMLSpanElement>(
      '.pagePagination span'
    );
    spans.forEach((span) => {
      span.addEventListener('click', () => {
        spans.forEach((s) => {
          s.classList.remove('active');
        });
        span.classList.add('active');
      });
    });

    this._userServ.getAllUsers(1).subscribe((users) => {
      console.log(users);
    });
  }
}
