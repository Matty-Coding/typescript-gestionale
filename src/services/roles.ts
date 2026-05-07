import type { Role } from "../types.js";
import { getAllData } from "./api.js";

let roles: Role[];

async function setRoles(): Promise<Role[]> {
  roles = (await getAllData("roles")) as Role[];
  return roles;
}

export { roles, setRoles };
