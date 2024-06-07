import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';
import { USER_ROLE } from "@/constants/role";
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';


export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = keyof typeof USER_ROLE;


export type ResponseSuccessType<T> = {
  data: T;
  meta?: TMeta;
};

export type TResponse<T> = {
  data?: T,
  error?: IGenericErrorResponse,
  meta?: TMeta,
  message: string,
  success: boolean
}

export type TResponseRedux<T> = TResponse<T> & typeof axiosBaseQuery;

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
export type TQueryParams = {
  name: string,
  value: React.Key | string | string[] | boolean
}

export type DrawerItem =  {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: DrawerItem[];
}