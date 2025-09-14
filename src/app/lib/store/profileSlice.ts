import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
    id : string | null,
    username : string | null,
    role : string | null,
    createdAt : string | null,
    updatedAt : string | null

}

const initialState: ProfileState = {
  id : null,
  username : null,
  role : null,
  createdAt : null,
  updatedAt : null


};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
        state.id = action.payload.id,
        state.username = action.payload.username,
        state.role = action.payload.role,
        state.createdAt = action.payload.createdAt,
        state.updatedAt = action.payload.updatedAt
    },
    clearProfile: (state) => {
        state.id = null,
        state.username = null,
        state.role = null,
        state.createdAt = null,
        state.updatedAt = null
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export type {ProfileState}
