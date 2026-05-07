import { handleCreate, handleUpdate } from "./api.js";
import type { Post, Resource, User, Comment, Role } from "../types.js";
import { displayData, handleFetch } from "../ui-management.js";

async function updateOrCreate(resource: Resource): Promise<void> {
  if (resource.id) {
    await handleUpdate(resource);
  } else {
    await handleCreate(resource);
  }
}

const closeModal = document.querySelector("#close-modal") as HTMLButtonElement;

async function handleFormSubmit(resource: Resource, form: HTMLFormElement) {
  form.onsubmit = async function (event: SubmitEvent): Promise<void> {
    event.preventDefault();

    switch (resource.type) {
      case "user": {
        const data = new FormData(form);
        const username = data.get("username") as string;
        const roleId = data.get("roleId") as string;
        const isActive = data.get("isActive") as string;

        const user: User = {
          id: resource.id,
          type: "user",
          username: username,
          roleId: roleId,
          isActive: isActive === "on" ? true : false,
        };

        updateOrCreate(user);
        break;
      }

      case "post": {
        const postData = new FormData(form);
        const title = postData.get("title") as string;
        const content = postData.get("content") as string;
        const isActivePost = postData.get("isActive") as string;
        const userId = postData.get("userId") as string;

        const post: Post = {
          id: resource.id,
          type: "post",
          title: title,
          content: content,
          isActive: isActivePost === "on" ? true : false,
          userId: userId,
        };

        updateOrCreate(post);
        break;
      }

      case "comment": {
        const commentData = new FormData(form);
        const contentComment = commentData.get("content") as string;
        const isActiveComment = commentData.get("isActive") as string;
        const userId = commentData.get("userId") as string;

        const comment: Comment = {
          id: resource.id,
          type: "comment",
          content: contentComment,
          isActive: isActiveComment === "on" ? true : false,
          postId: userId,
        };

        updateOrCreate(comment);
        break;
      }

      case "role": {
        const roleData = new FormData(form);
        const name = roleData.get("name") as string;
        const isActiveRole = roleData.get("isActive") as string;

        const role: Role = {
          id: resource.id,
          type: "role",
          name: name,
          count: 0,
          isActive: isActiveRole === "on" ? true : false,
        };

        updateOrCreate(role);
        break;
      }

      default:
        break;
    }

    const resources = await handleFetch(resource.type);
    displayData(resources);

    closeModal.click();
  };
}

export { updateOrCreate, handleFormSubmit };
