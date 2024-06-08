
import { authKey } from '@/constants/authkey';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { cookies } from 'next/headers';

export const logoutUser = (router: AppRouterInstance) => {
   localStorage.removeItem(authKey);
   cookies().delete(authKey);
   router.push('/');
   router.refresh();
};