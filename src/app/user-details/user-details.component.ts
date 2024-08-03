import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { userInterface } from '../interface/userInterface';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  user!: userInterface;

  constructor(
    private userServ: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = Number(params.get('id'));

      this.userServ.getUserById(userId).subscribe(
        (user) => {
          this.user = user.data;
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    });
  }

  goBack(): void {
    this.router.navigate(['/users-list']);
  }
}
