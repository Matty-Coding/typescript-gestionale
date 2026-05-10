import type { Resource, User } from "../types/resources.js";
import { syncRoleCount } from "./roles-counter.js";

const localhost: string = "http://localhost:3000";

async function getAllData(field: string): Promise<Resource[]> {
  try {
    const response: Response = await fetch(`${localhost}/${field}`);
    return await response.json();
  } catch (error) {
    console.error(`Network error: ${error}`);
    return [];
  }
}

// handle resources api
async function handleCreate(
  resource: Resource,
  type: string,
): Promise<Resource | undefined> {
  try {
    const response = await fetch(`${localhost}/${type.toLowerCase()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });

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
async function handleUpdate(
  resource: Resource,
  type: string,
): Promise<Resource | undefined> {
  try {
    let oldUser: User | null = null;

    // take oldUser before sending data
    if (type === "user") {
      const data = (await getAllData("users")) as User[];
      oldUser = data.find((u) => u.id === resource.id) as User;
    }

    const response = await fetch(
      `${localhost}/${type.toLowerCase()}/${resource.id}`,
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
async function softDelete(
  resource: Resource,
  type: string,
): Promise<Resource | undefined> {
  // update role after delete resource
  if (type === "user") {
    await syncRoleCount("", (resource as User).roleId);
  }
  const deactivatedResource = { ...resource, isActive: false };
  return await handleUpdate(deactivatedResource, type);
}

// remove resource from fake database
async function hardDelete(resource: Resource, type: string): Promise<void> {
  await fetch(`${localhost}/${type.toLowerCase()}/${resource.id}`, {
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
