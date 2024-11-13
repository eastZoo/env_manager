import { atom } from "recoil";

import { Member } from "../types/member";
import { RECOIL_PERSIST_KEY } from "../sharedStrings";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: RECOIL_PERSIST_KEY,
});

export const memberState = atom<Member | null>({
  key: `member`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});
