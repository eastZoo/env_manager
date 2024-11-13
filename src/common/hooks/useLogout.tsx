import { useRecoilState, useSetRecoilState } from "recoil";
import { memberState } from "../states/member";

import {
  ACCESS_TOKEN,
  RECOIL_PERSIST_KEY,
  REFRESH_TOKEN,
} from "../sharedStrings";

export const useLogout = () => {
  const setMember = useSetRecoilState(memberState);

  const logout = () => {
    setMember(null);
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(RECOIL_PERSIST_KEY);
    window.location.href = "/";
  };

  return logout;
};
