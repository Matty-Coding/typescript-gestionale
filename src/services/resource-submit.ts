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

async function handleFormSubmit(
  resource: Resource,
  form: HTMLFormElement,
  button: HTMLButtonElement,
): Promise<void> {
  form.addEventListener("submit", async (event): Promise<void> => {
    event.preventDefault();

    switch (resource.type) {
      case "user": {
        const data = new FormData(form);
        const username = (data.get("username") as string).trim();
        const roleId = (data.get("roleId") as string).trim();
        const isActive = (data.get("isActive") as string).trim();

        // validation empty username
        if (!username) return;
        button.disabled = true;

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
        const title = (postData.get("title") as string).trim();
        const content = (postData.get("content") as string).trim();
        const isActivePost = (postData.get("isActive") as string).trim();
        const userId = (postData.get("userId") as string).trim();

        // validation empty value
        if (!title || !content || !userId) return;
        button.disabled = true;

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
        const contentComment = (commentData.get("content") as string).trim();
        const isActiveComment = (commentData.get("isActive") as string).trim();
        const postId = (commentData.get("postId") as string).trim();

        if (!contentComment || !postId) return;
        button.disabled = true;

        const comment: Comment = {
          id: resource.id,
          type: "comment",
          content: contentComment,
          isActive: isActiveComment === "on" ? true : false,
          postId: postId,
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

    const resources = await handleFetch(`${resource.type}s`);
    displayData(resources);

    closeModal.click();
  });
}

export { updateOrCreate, handleFormSubmit };
