import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  userInterface,
  userResponseById,
  UsersResponse,
} from '../interface/userInterface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getAllUsers(page: number = 1): Observable<userInterface[]> {
    const cacheKey = `users_page_${page}`;
    if (this.cacheService.has(cacheKey)) {
      return new Observable<userInterface[]>((observer) => {
        observer.next(this.cacheService.get(cacheKey));
        observer.complete();
      });
    } else {
      return this.http.get<UsersResponse>(`${this.apiUrl}?page=${page}`).pipe(
        map((response) => {
          const users = response.data;
          this.cacheService.set(cacheKey, users);
          return users;
        }),
        catchError(this.handleError)
      );
    }
  }

  getUserById(userId: number): Observable<userResponseById> {
    const cacheKey = `user_${userId}`;
    if (this.cacheService.has(cacheKey)) {
      return new Observable<userResponseById>((observer) => {
        observer.next(this.cacheService.get(cacheKey));
        observer.complete();
      });
    } else {
      return this.http.get<userResponseById>(`${this.apiUrl}/${userId}`).pipe(
        map((response) => {
          this.cacheService.set(cacheKey, response);
          return response;
        }),
        catchError(this.handleError)
      );
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
