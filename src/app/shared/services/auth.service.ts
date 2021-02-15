import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor() { }
    public isAuthenticated(): boolean {
        if (localStorage.getItem('userData')) {
            const token = JSON.parse(localStorage.getItem('userData')!);
            // Check whether the token is expired and return
            // true or false
            //return !this.jwtHelper.isTokenExpired(token);
            return true;
        } else {
            return false;
        }
    }
}