import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('Reducer: user-process', () => {
  let state: UserProcess;

  beforeEach(()=> {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: null,
    };
  });

  describe ('checkAuthAction' , ()=> {
    it ('should set authorizationStatus NoAuth if checkAuthAction is rejected', ()=>
      expect(userProcess.reducer(state, {type: checkAuthAction.rejected.type, payload: ''}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null}));
    it ('should set authorizationStatus Auth if checkAuthAction is fulfilled', ()=>
      expect(userProcess.reducer(state, {type: checkAuthAction.fulfilled.type, payload: 'some email'}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userInfo: 'some email'}));
  });
  describe ('loginAction' , ()=> {
    it ('should set authorizationStatus NoAuth if loginAction is rejected', ()=>
      expect(userProcess.reducer(state, {type: loginAction.rejected.type, payload: ''}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null}));
    it ('should set authorizationStatus Auth if loginAction is fulfilled', ()=>
      expect(userProcess.reducer(state, {type: loginAction.fulfilled.type, payload: 'some email'}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, userInfo: 'some email'}));
  });
  describe ('logoutAction' , ()=> {
    state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: {
        email: 'some email',
        id: 1,
        token: 'token'
      },
    };

    it ('should set authorizationStatus NoAuth if logoutAction is fulfilles', ()=>
      expect(userProcess.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, userInfo: null}));
  });


});


