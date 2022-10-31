import { httpClient } from './httpClient';

import {
  SignIn,
  SignInWithToken,
  SignUp,
  ResetPassword,
  SwitchAccount,
  AccountUserList,
} from './api.types';

export const signIn = ({ user, password }: SignIn, signal?: AbortSignal) =>
  httpClient.get('user/authentication', {
    headers: { 'Girder-Authorization': `Basic ${window.btoa(`${user}:${password}`)}` },
    signal,
  });

export const signInWithToken = ({ token }: SignInWithToken, signal?: AbortSignal) =>
  httpClient.get('/user/authentication', {
    headers: {
      'Girder-Token': token,
    },
    signal,
  });

export const signUp = ({ body }: SignUp, signal?: AbortSignal) =>
  httpClient.post('/user', {
    params: {
      ...body,
      admin: true,
    },
    signal,
  });

export const resetPassword = ({ body }: ResetPassword, signal?: AbortSignal) =>
  httpClient.put('/user/password/temporary', {
    params: {
      ...body,
    },
    signal,
  });

export const getUserDetails = (signal?: AbortSignal) => httpClient.get('/user/me', { signal });

export const getAccounts = (signal?: AbortSignal) => httpClient.get('/user/accounts', { signal });

export const switchAccount = ({ accountId }: SwitchAccount, signal?: AbortSignal) =>
  httpClient.put('/user/switchAccount', {
    params: {
      accountId,
    },
    signal,
  });

export const getThemes = (signal?: AbortSignal) => httpClient.get('/theme', { signal });

export const getAccountUserList = (
  { appletId, role, MRN, pagination, sort }: AccountUserList,
  signal?: AbortSignal,
) =>
  httpClient.get('/account/users', {
    params: {
      appletId,
      role,
      MRN,
      pagination,
      sort,
    },
    signal,
  });

export const getLibraryCategories = (signal?: AbortSignal) =>
  httpClient.get('/library/categories', { signal });
