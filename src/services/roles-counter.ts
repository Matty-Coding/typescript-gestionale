import { getAllData, handleUpdate } from "./api.js";
import type { Role } from "../types/resources.js";

// sync role count
async function syncRoleCount(
  newRoleId: string,
  oldRoleId: string = "",
): Promise<void> {
  const roles = (await getAllData("roles")) as Role[];

  for (const role of roles) {
    if (role.id === newRoleId) {
      await handleUpdate({ ...role, count: role.count + 1 }, "role");
    } else if (role.id === oldRoleId) {
      await handleUpdate({ ...role, count: role.count - 1 }, "role");
    }
  }
}

export { syncRoleCount };
