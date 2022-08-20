import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import { UserData } from './user-data';


export type UserProcess = {
  authorizationStatus: AuthorizationStatus
  userInfo: UserData | null;
};

export type State = ReturnType <typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
