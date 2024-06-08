'use server';

import { authKey } from '@/constants/authkey';
import { cookies } from 'next/headers';


const setAccessToken = (token: string) => {
   cookies().set(authKey, token);

};

export default setAccessToken;