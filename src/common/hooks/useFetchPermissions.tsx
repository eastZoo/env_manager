import { useQuery } from "@tanstack/react-query";

import { request } from "../api";
import { useSetRecoilState } from "recoil";
import { permissionsState } from "../states/permission";
import { readAccessToken } from "../functions/authFunctions";
import { GET_GROUP_PERMISSIONS } from "../querykeys";
import { Permission } from "../types/permission";

const useFetchPermissions = () => {
  const setPermissions = useSetRecoilState(permissionsState);
  const accessToken = readAccessToken();
  const { data: permissions } = useQuery({
    queryKey: [GET_GROUP_PERMISSIONS],
    queryFn: async () => {
      if (!accessToken) {
        setPermissions(null);
        return [];
      }

      const resPermissions = await request<Permission[]>({
        method: "GET",
        url: "/permission/group",
      });

      setPermissions(resPermissions);

      return resPermissions;
    },
  });

  return permissions;
};

export default useFetchPermissions;
