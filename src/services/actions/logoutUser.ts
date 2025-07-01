'use server';

import { authKey } from '@/constants/authkey';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logoutUser = async () => {
   // Clear the cookie
   cookies().delete(authKey);

   // Redirect to home page
   redirect('/');
};

// Client-side function to clear localStorage and call server action
export const logoutUserComplete = async () => {
   // Clear localStorage
   if (typeof window !== 'undefined') {
      localStorage.removeItem(authKey);
   }

   // Call server action to clear cookie
   await logoutUser();
};

export const clearAuthCookie = async () => {
   cookies().delete(authKey);
};