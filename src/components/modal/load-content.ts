import type { Resource, Role, User, Post, Comment } from "../../types.js";
import {
  postModal,
  userModal,
  commentModal,
  roleModal,
  moveIntoTrash,
  trashModal,
} from "./content.js";

const modal = document.querySelector("#modal") as HTMLDivElement;
const modalTitle = document.querySelector("#modal-title") as HTMLHeadingElement;
const modalContent = document.querySelector("#modal-content") as HTMLDivElement;

async function openModal(resource: Resource, remove?: boolean): Promise<void> {
  modalContent.innerHTML = "";
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  switch (resource.type) {
    case "user":
      if (remove) {
        modalTitle.textContent = "Delete user";
        await moveIntoTrash(resource);
        return;
      }
      modalTitle.textContent = `${!resource.id ? "Create" : "Update"} user`;
      await userModal(resource as User);
      break;

    case "post":
      if (remove) {
        modalTitle.textContent = "Delete post";
        await moveIntoTrash(resource);
        return;
      }
      modalTitle.textContent = `${!resource.id ? "Create" : "Update"} post`;
      await postModal(resource as Post);
      break;

    case "comment":
      if (remove) {
        modalTitle.textContent = "Delete comment";
        await moveIntoTrash(resource);
        return;
      }
      modalTitle.textContent = `${!resource.id ? "Create" : "Update"} comment`;
      await commentModal(resource as Comment);
      break;

    case "role":
      if (remove) {
        modalTitle.textContent = "Delete role";
        await moveIntoTrash(resource);
        return;
      }
      modalTitle.textContent = `${!resource.id ? "Create" : "Update"} role`;
      await roleModal(resource as Role);
      break;

    default:
      break;
  }
}

async function openTrashModal(resources: Resource[]): Promise<void> {
  modalContent.innerHTML = "";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modalTitle.textContent = "Trash";
  await trashModal(resources);
}

export { openModal, openTrashModal };
