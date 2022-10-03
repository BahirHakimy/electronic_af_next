import axios from "axios";

type TOKENS_TYPE = { access?: string; refresh?: string };

const TokenKey = "AUTH_TOKEN";

function getTokens(): TOKENS_TYPE | null {
  const tokens = localStorage.getItem(TokenKey);
  if (tokens !== null && JSON.parse(tokens)?.access !== null) {
    return JSON.parse(tokens);
  }
  return null;
}

function setTokens(data: TOKENS_TYPE) {
  localStorage.setItem(TokenKey, JSON.stringify(data));
}

axios.defaults.baseURL = process.env.API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 60000,
  headers: {
    Authorization: "Bearer " + getTokens()?.access,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

let retryCount = 0;
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      error?.response?.statusText === "Unauthorized"
    ) {
      const refresh_token = getTokens()?.refresh;
      retryCount++;
      if (retryCount < 3) {
        return axiosInstance
          .post("auth/token/refresh/", { refresh: refresh_token })
          .then((response) => {
            setTokens(response.data);
            originalRequest.headers["Authorization"] =
              "Bearer " + response.data.access;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      } else {
        return Promise.reject({
          response: {
            message: "Authorization tokens has expired please reauthenticate",
          },
        });
      }
    }
    return Promise.reject(error);
  }
);

export {
  axiosInstance as axios,
  getTokens,
  setTokens,
  axios as baseAxios,
  TokenKey,
};
