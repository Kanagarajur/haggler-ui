import { Injectable } from '@angular/core';
import { IUserProfile } from './../interfaces/iUserProfile';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as userState from '../../member/reducers/user.reducer';

@Injectable({ providedIn: 'root' })
export class UserService {
    userInfo: IUserProfile;
    constructor(private store: Store<userState.State>) {

        this.userInfo  = {
            country: 'USA'
        };
    }

    setUserData(data: any) {
        this.userInfo = data;
        this.store.dispatch({
            type: 'SET_PROF_DATA',
            payload: data
        });
    }

    resolve() {
        this.store.pipe(select(userState.getUserDetails)).subscribe(
            (result) => {
                if(result.businessId) {
                    return result;
                } else {
                    let userData = this.getProfile();
                    this.setUserData(userData);
                    return true;
                }
            }
        );
      }

    getProfile(): IUserProfile { 
        if (localStorage.getItem('userData')) {
            this.userInfo = JSON.parse(localStorage.getItem('userData')!);                
        } 
        return this.userInfo;
    }

    logout() {
        //Cookie.delete('TOKEN');
        localStorage.removeItem('userData');
        return true;
    }
}