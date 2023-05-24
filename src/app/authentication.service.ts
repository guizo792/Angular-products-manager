import { Injectable } from '@angular/core';
import { AppUser } from './model/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  users: AppUser[] = [];
  authenticatedUser: AppUser | undefined;

  constructor() {
    this.users.push({
      id: UUID.UUID(),
      username: 'user1',
      password: '1234',
      roles: ['USER'],
    });
    this.users.push({
      id: UUID.UUID(),
      username: 'user2',
      password: '1234',
      roles: ['USER'],
    });
    this.users.push({
      id: UUID.UUID(),
      username: 'admin',
      password: '1234',
      roles: ['USER, ADMIN'],
    });
  }

  public login(username: string, password: string): Observable<AppUser> {
    console.log('logging in ...');
    let appUser = this.users.find((u) => u.username === username);
    if (!appUser) return throwError(() => new Error('User not found'));
    console.log('user found');
    if (appUser.password !== password) {
      console.log('checking password correctness ...');
      return throwError(() => new Error('Wrong credentials'));
    }

    console.log('checked...');
    return of(appUser);
  }

  public authenticateUser(appUser: AppUser): Observable<boolean> {
    console.log('authenticating ...');
    this.authenticatedUser = appUser;
    localStorage.setItem(
      'authUser',
      JSON.stringify({
        username: appUser.username,
        roles: appUser.roles,
        jwt: 'JWT_TOKEN',
      })
    );
    return of(true);
  }

  public hasRole(role: string): boolean {
    return this.authenticatedUser!.roles.includes(role);
  }

  public isAuthenticated() {
    return this.authenticatedUser != undefined;
  }
}
