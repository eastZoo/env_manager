import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  logout,
  readAccessToken,
  readRefreshToken,
  writeAccessToken,
  writeRefreshToken,
} from "./authFunctions";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    // localStorage에서 accessToken 호출
    const accessToken = readAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401에러 일 시
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // localStorage에서 accessToken, refresh 호출
      const jwtToken = readAccessToken();
      const refreshToken = readRefreshToken();
      if (!refreshToken) {
        alert("로그인해주세요");
        return logout();
      }
      try {
        // 토큰 재요청
        const response = await axios.post(
          `${process.env.REACT_APP_API_HOST}/api/Users/refresh-token`,
          {
            jwtToken,
            refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        // localStorage에 jwtToken, refreshToken 저장
        const accessTokenData = response?.data?.jwtToken;
        const refreshTokenData = response?.data?.refreshToken;
        writeAccessToken(accessTokenData);
        writeRefreshToken(refreshTokenData);

        return api(originalRequest);
      } catch (e) {
        alert("토큰이 만료되었습니다. 다시 로그인해주세요");
        return logout();
      }
    }

    return Promise.reject(error);
  }
);

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await api.request<T>({ ...config });
    return data;
  } catch (error) {
    const { response }: any = error as unknown as AxiosError;
    if (response) {
      throw response.data;
    }

    throw error;
  }
};

const setToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const checkToken = async () => {
  const refreshToken = readRefreshToken();
};

const tryCatchError = (error: any) => {
  if (Object.keys(error).length === 0) return;

  if (!error) return;
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    alert(error.message);
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "title" in error &&
    typeof error.title === "string"
  ) {
    alert(error.title);
  }
};

export { checkToken, request, setToken, tryCatchError };
