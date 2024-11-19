import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface User {
  id: string;
  userId: string;
  username: string;
  profile: UserProfile;
  profileImg: UserProfileImg;
  createdAt: Date;
  updatedAt: Date;
}

export const userState = atom<User | null>({
  key: `user`,
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const alramState = atom<boolean>({
  key: `alram`,
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const accountFind = atom<{ username: string; phoneNumber: string }>({
  key: `accountFind`,
  default: {
    username: "",
    phoneNumber: "",
  },
});

export interface UserProfile {
  id: string;
  email: string;
  phoneNumber: string;
}

export interface UserProfileImg {
  id: string;
  imagename: string;
  size: number;
  imageUrl: string;
  createdAt: Date;
}
