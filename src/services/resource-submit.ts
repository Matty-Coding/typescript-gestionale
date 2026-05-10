import { handleCreate, handleUpdate } from "./api.js";
import type {
  Resource,
  User,
  Post,
  Comment,
  Role,
} from "../types/resources.js";
import { displayData, handleFetch } from "../ui-management.js";
import { closeModal } from "../utils/close-modal.js";

async function updateOrCreate(resource: Resource, type: string): Promise<void> {
  if (resource.id) {
    await handleUpdate(resource, type);
  } else {
    await handleCreate(resource, type);
  }
}

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

        // validation empty username
        if (!username) return;
        button.disabled = true;

        const user: User = {
          id: resource.id,
          type: "user",
          username: username,
          roleId: roleId,
          isActive: true,
        };

        await updateOrCreate(user, "users");
        break;
      }

      case "post": {
        const postData = new FormData(form);
        const title = (postData.get("title") as string).trim();
        const content = (postData.get("content") as string).trim();
        const userId = (postData.get("userId") as string).trim();

        // validation empty value
        if (!title || !content || !userId) return;
        button.disabled = true;

        const post: Post = {
          id: resource.id,
          type: "post",
          title: title,
          content: content,
          isActive: true,
          userId: userId,
        };

        await updateOrCreate(post, "posts");
        break;
      }

      case "comment": {
        const commentData = new FormData(form);
        const contentComment = (commentData.get("content") as string).trim();
        const postId = (commentData.get("postId") as string).trim();

        if (!contentComment || !postId) return;
        button.disabled = true;

        const comment: Comment = {
          id: resource.id,
          type: "comment",
          content: contentComment,
          isActive: true,
          postId: postId,
        };

        await updateOrCreate(comment, "comments");
        break;
      }

      case "role": {
        const roleData = new FormData(form);
        const name = roleData.get("name") as string;

        const role: Role = {
          id: resource.id,
          type: "role",
          name: name,
          count: 0,
          isActive: true,
        };

        await updateOrCreate(role, "roles");

        break;
      }

      default:
        break;
    }

    const resources = await handleFetch(`${resource.type}s`);

    await displayData(resources);

    closeModal();
  });
}

export { updateOrCreate, handleFormSubmit };
