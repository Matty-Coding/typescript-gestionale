import type { Resource, User } from "../types.js";
import { syncRoleCount } from "./roles-counter.js";

const localhost: string = "http://localhost:3000";

async function getAllData(field: string): Promise<Resource[]> {
  try {
    const response: Response = await fetch(`${localhost}/${field}`);
    return response.json();
  } catch (error) {
    console.error(`Network error: ${error}`);
    return [];
  }
}

// handle resources api
async function handleCreate(resource: Resource): Promise<Resource | undefined> {
  try {
    const response = await fetch(
      `${localhost}/${resource.type.toLowerCase()}s`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resource),
      },
    );

    if (response.ok) {
      const data = await response.json();

      if (resource.type === "user") await syncRoleCount(data.roleId);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

// manage update resources
async function handleUpdate(resource: Resource): Promise<Resource | undefined> {
  try {
    let oldUser: User | null = null;

    // take oldUser before sending data
    if (resource.type === "user") {
      const data = (await getAllData("users")) as User[];
      oldUser = data.find((u) => u.id === resource.id) as User;
    }

    const response = await fetch(
      `${localhost}/${resource.type.toLowerCase()}s/${resource.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resource),
      },
    );

    if (response.ok) {
      const data = await response.json();

      // handle role count if resource is user
      if (oldUser && oldUser.roleId !== (resource as User).roleId) {
        await syncRoleCount((resource as User).roleId, oldUser.roleId);
      }
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

// move resource into trash
async function softDelete(resource: Resource): Promise<Resource | undefined> {
  const deactivatedResource = { ...resource, isActive: false };
  return await handleUpdate(deactivatedResource);
}

// remove resource from fake database
async function hardDelete(resource: Resource): Promise<void> {
  await fetch(`${localhost}/${resource.type}s/${resource.id}`, {
    method: "DELETE",
  });
}

export {
  getAllData,
  handleCreate,
  handleUpdate,
  localhost,
  softDelete,
  hardDelete,
};
