import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReducerName, DataStatus, StorageKey } from 'common/enums';
import { IUser, IUserLoginPayload, IRegisterPayload } from 'common/interfaces';
import { authApi, notificationService, storage } from 'services';
import { LoginResponse } from 'common/types/responses';


type AuthState = {
  user: IUser | null;
  dataStatus: DataStatus;
};

const initialState: AuthState = {
  user: null,
  dataStatus: DataStatus.IDLE,
};

const login = createAsyncThunk(
  'auth/login',
  async (userData: IUserLoginPayload) => {
    try {
      const { token, user }: LoginResponse = await authApi.loginUser(userData);
      storage.setItem(StorageKey.TOKEN, token);
      return user;
    } catch(error) {
      notificationService.error(`Error ${error.status}`, error.message);
      throw error;
    }
  },
);

const registration = createAsyncThunk(
  'auth/registration',
  async (userData: IRegisterPayload) => {
    try {
      const { token, user } = await authApi.registrationUser(userData);
      storage.setItem(StorageKey.TOKEN, token);
      return user;
    } catch(error) {
      notificationService.error(`Error ${error.status}`, error.message);
      throw error;
    }
  },
);

const { reducer, actions } = createSlice({
  name: ReducerName.AUTH,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const sharedReducer = (state: AuthState, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    }
    builder
      .addCase(login.fulfilled, sharedReducer)
      .addCase(registration.fulfilled, sharedReducer);
  },
});

const AuthActionCreator = {
  ...actions,
  login,
  registration,
};

export { AuthActionCreator, reducer };
