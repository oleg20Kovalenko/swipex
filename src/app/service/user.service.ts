import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequestOptions } from '../models/user.request.options';
import { UsersPage } from '../models/users.page';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(options: UserRequestOptions): Observable<UsersPage> {
    return this.http
      .get<UsersPage>(this.URL, options)
      .pipe(map((page) => page));
  }
}
