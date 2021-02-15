import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
    dealMiscDetails : iDealMiscInterface
}

export interface iDealMiscInterface {
    sortBy: string;
    sortDir: string;
}

const defaultValue : iDealMiscInterface = {
    sortBy: 'currentDate',
    sortDir: 'DESC'
};

const getDealsMiscState = createFeatureSelector<iDealMiscInterface>('dealMiscDetails');

export const getDealsMiscDetails = createSelector(
    getDealsMiscState,
    state => state);

export function DealReducer(state = defaultValue, action: any): iDealMiscInterface {
    switch (action.type) {
        case 'CHANGE_SORTING':
            return {
                ...state,
                sortBy: action.payload.sortColumn,
                sortDir: action.payload.sortDir
            };
        default:
            return state;
    }
}