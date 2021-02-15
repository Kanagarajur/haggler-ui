import { IUserProfile } from 'src/app/shared/interfaces/iUserProfile';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
    userDetails: IUserProfile
}

const getUserDetailsState = createFeatureSelector<IUserProfile>('userDetails');

export const getUserDetails = createSelector(
    getUserDetailsState,
    (state : any) => state);

const defaultValue: IUserProfile = {
    imageURL: 'assets/images/hagglr-usr.png'
};
export function UserReducer(state = defaultValue, action: any): IUserProfile {
    switch (action.type) {
        case 'SET_IMAGE_URL':
            return {
                ...state,
                imageURL: action.payload.imagePath
            };
        case 'SET_PROF_DATA':
            return {
                ...state,
                ...action.payload
            };
            
        default:
            return state;
    }
}