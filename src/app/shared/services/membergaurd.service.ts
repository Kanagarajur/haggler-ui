// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class MemberGuardService implements CanActivate {
  constructor(public auth: AuthService,
    public router: Router,
    public _userSvc: UserService) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      let userProfile = this._userSvc.getProfile();
      if (userProfile && 'category' in userProfile && (userProfile.category === null || userProfile.category === '')) {
        this.router.navigate(['member/updateProfile']);
        return false;
      }
      return true;
    }
    return false;
  }
}