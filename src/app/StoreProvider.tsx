'use client';

import { Provider, useDispatch } from 'react-redux';
import { store } from './lib/store/store';
import { getProfile } from './lib/auth';
import { setProfile } from './lib/store/profileSlice';
import { useEffect } from 'react';

export function StoreProvider({ children }: { children: React.ReactNode }) {
const dispatch = useDispatch()
  
    async function getProfileData(){
       if(localStorage.getItem("authToken")){
            const response = await getProfile()
            console.log("isi profileinfo : ", response);
            dispatch(setProfile(response))
       } 
    }
  
    useEffect(() => {
      getProfileData();
    },[])
  return <Provider store={store}>{children}</Provider>;
}