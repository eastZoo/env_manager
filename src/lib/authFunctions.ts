const ACCESS_TOKEN = "access-token";
const REFRESH_TOKEN = "refresh-token";

export const writeAccessToken = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const writeRefreshToken = (refreshToken: string) => {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const readAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const readRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const getUserInfo = () => {
  const localStorageUser: string | null =
    localStorage.getItem("recoil-persist");
  if (localStorageUser) {
    const storageJson = JSON.parse(localStorageUser);
    return storageJson["user"];
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  window.location.href = "/";
  localStorage.removeItem("recoil-persist");

  // f7router.navigate("/login");
};

export const validateToken = async () => {};
