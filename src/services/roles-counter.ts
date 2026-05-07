import { getAllData, handleUpdate } from "./api.js";
import type { Role } from "../types.js";

// sync role count
async function syncRoleCount(
  newRoleId: string,
  oldRoleId: string = "",
): Promise<void> {
  const roles = (await getAllData("roles")) as Role[];
  console.log("invocata");

  for (const role of roles) {
    if (role.id === newRoleId) {
      role.count += 1;
      await handleUpdate(role);
    } else if (role.id === oldRoleId) {
      role.count -= 1;
      await handleUpdate(role);
    }
  }
}

export { syncRoleCount };
