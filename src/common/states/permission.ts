import { atom, selectorFamily } from "recoil";
import { Permission } from "../types/permission";

export const permissionsState = atom<Permission[] | null>({
  key: `permission`,
  default: null,
});

export const permissionSelector = selectorFamily<
  Permission | undefined,
  string
>({
  key: "permissionSelector",
  get:
    (pmsMenuName) =>
    ({ get }) => {
      const permissions = get(permissionsState);

      if (!permissions) {
        return undefined;
      }

      return permissions.find(
        (permission) => permission.pmsMenuName === pmsMenuName
      );
    },
});
