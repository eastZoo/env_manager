import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiError } from "./types/apiError";
import {
  logout,
  readAccessToken,
  readRefreshToken,
  writeAccessToken,
  writeRefreshToken,
} from "./functions/authFunctions";
import { showAlert } from "../components/containers/Alert";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 600000, // 파일 다운 관련 지연으로 인한 timeout 설정
});

api.interceptors.request.use(
  async (config) => {
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const jwtToken = readAccessToken();
      const refreshToken = readRefreshToken();
      if (!refreshToken) {
        showAlert("로그인해주세요");
        return logout();
      }
      try {
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

        const accessTokenData = response?.data?.jwtToken;
        const refreshTokenData = response?.data?.refreshToken;
        writeAccessToken(accessTokenData);
        writeRefreshToken(refreshTokenData);

        return api(originalRequest);
      } catch (e) {
        showAlert("토큰이 만료되었습니다. 다시 로그인해주세요");
        return logout();
      }
    }

    return Promise.reject(error);
  }
);

/**
 * @param config - axios request config
 * @param isShowError - 에러 발생시 alert 띄울지 여부
 * @returns
 */
const request = async <T>(
  config: AxiosRequestConfig,
  isShowError: boolean = true
): Promise<T> => {
  const { method } = config;
  const isGetRequest = method?.toUpperCase() === "GET";

  try {
    const { data } = await api.request<T>({ ...config });

    if (!isGetRequest && (data as any)?.success === false) {
      throw new ApiError({
        message: (data as any)?.message ?? "서버요청 에러!",
      });
    }

    return data;
  } catch (error: any) {
    let message = "서버요청 에러!";

    console.log(error);
    if (error instanceof AxiosError) {
      const { response }: any = error;
      if (response?.data?.message) {
        message = response.data.message;
      }

      if (isGetRequest) {
        if (error?.response?.status === 403) {
          showAlert("조회 권한이 없습니다");
        }

        return [] as any;
      }
    } else if (error instanceof ApiError) {
      message = error.message;
    }

    if (isShowError && !isGetRequest) {
      console.log(error);
      /** POST 요청 */
      if (error?.response?.status === 500) {
        showAlert("서버요청 에러!");
      } else if (error?.response?.status === 404) {
        showAlert("파일을 찾을 수 없습니다.");
      } else if (error?.response?.status === 415) {
        showAlert(error?.response.data.message);
      }
    }

    throw error;
  }
};

export { request };
