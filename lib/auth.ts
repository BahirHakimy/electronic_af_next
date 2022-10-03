import { AxiosResponse } from "axios";

import { baseAxios } from "./client";

type LOGIN_PROPS = { email: string; password: string };
type REGISTER_PROPS = {
  firstname: string;
  lastname: string;
  phone: string | number;
  email: string;
  password: string;
};

const login = (credentials: LOGIN_PROPS): Promise<AxiosResponse> => {
  return baseAxios.post("auth/token/", credentials);
};

const regitser = (data: REGISTER_PROPS): Promise<AxiosResponse> => {
  return baseAxios.post("auth/register/", data);
};

export { login, regitser };
