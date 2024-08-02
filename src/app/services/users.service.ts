import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  userInterface,
  userResponseById,
  UsersResponse,
} from '../interface/userInterface';
import { catchError, map, Observable, throwError } from 'rxjs';

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
  getUserById(userId: string): Observable<userResponseById> {
    return this.http
      .get<userResponseById>(`${this.apiUrl}/${userId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
