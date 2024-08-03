import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersListComponent } from './users-list/users-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'userdetails/:id', component: UserDetailsComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: '', redirectTo: '/users-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
