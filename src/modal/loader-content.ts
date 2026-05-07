import type { Resource, Role, User, Post, Comment } from "../types.js";
import { postModal, userModal, commentModal, roleModal } from "./content.js";

// =========  load data in modal  =======
const modal = document.querySelector("#modal") as HTMLDivElement;
const modalTitle = document.querySelector("#modal-title") as HTMLHeadingElement;
const modalContent = document.querySelector("#modal-content") as HTMLDivElement;

async function openModal(resource: Resource): Promise<void> {
  modalContent.innerHTML = "";
  modal.classList.remove("hidden");

  switch (resource.type) {
    case "user":
      modalTitle.textContent = `${!resource.id ? "Create" : "Update"} user`;
      await userModal(resource as User);
      break;

    case "post":
      modalTitle.textContent = `${!resource.id ? "Create" : "Update"} post`;
      await postModal(resource as Post);
      break;

    case "comment":
      modalTitle.textContent = `${!resource.id ? "Create" : "Update"} comment`;
      await commentModal(resource as Comment);
      break;

    case "role":
      modalTitle.textContent = `${!resource.id ? "Create" : "Update"} role`;
      await roleModal(resource as Role);
      break;

    default:
      break;
  }
}

export { openModal };
