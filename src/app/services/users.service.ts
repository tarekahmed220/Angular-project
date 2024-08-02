import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userInterface, UsersResponse } from '../interface/userInterface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: userInterface[] = [];
  private apiUrl = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) {}

  getAllUsers(page: number = 1): Observable<userInterface[]> {
    return this.http.get<UsersResponse>(`${this.apiUrl}?page=${page}`).pipe(
      map((response) => {
        this.users = response.data;
        return this.users;
      })
    );
  }
}
