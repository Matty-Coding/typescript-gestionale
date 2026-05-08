import type { User, Role, Post, Comment, Resource } from "../types.js";
import {
  getAllData,
  hardDelete,
  handleUpdate,
  softDelete,
} from "../services/api.js";
import { createForm } from "../components/form.js";
import { generateTextInput } from "../components/text-input.js";
import { generateCheckbox } from "../components/checkbox-input.js";
import { generateSubmitButton } from "../components/modal-submit-button.js";
import { handleFormSubmit } from "../services/resource-submit.js";
import { displayData, handleFetch } from "../ui-management.js";

const modalContent = document.querySelector("#modal-content") as HTMLDivElement;

async function userModal(resource: User): Promise<HTMLDivElement> {
  const roles = (await getAllData("roles")) as Role[];

  // form
  const userForm = createForm();

  // inputs
  const usernameInput = generateTextInput(
    "Insert valid name",
    "username",
    resource.username as string,
  );

  // roles select
  const roleIdInput = document.createElement("select") as HTMLSelectElement;
  roleIdInput.name = "roleId";

  roles.forEach((element) => {
    const option = document.createElement("option") as HTMLOptionElement;
    option.id = element.id as string;
    option.value = element.id as string;
    option.textContent = element.name as string;
    roleIdInput.appendChild(option);
  });

  // checkbox isActive statement
  const isActiveInput = generateCheckbox(
    resource.isActive,
    "isActive",
    "Active",
  );

  // submit button
  const modalSubmitButton = generateSubmitButton(resource);

  userForm.append(usernameInput, roleIdInput, isActiveInput, modalSubmitButton);

  // build modal
  modalContent.appendChild(userForm);

  // listener submit form
  handleFormSubmit(resource, userForm, modalSubmitButton);

  return modalContent;
}

async function postModal(resource: Post): Promise<HTMLDivElement> {
  // form
  const postForm = createForm();

  // select user
  const selectUserId = document.createElement("select") as HTMLSelectElement;
  selectUserId.name = "userId";
  const users = (await getAllData("users")) as User[];

  if (users.length === 0) {
    const usersEmpty = document.createElement("p") as HTMLParagraphElement;
    usersEmpty.textContent =
      "Cannot create post without user. Create a user first!";
    usersEmpty.classList.add(
      "text-red-700",
      "text-md",
      "md:text-lg",
      "xl:text-2xl",
      "text-center",
    );
    modalContent.appendChild(usersEmpty);
    return modalContent;
  }

  users.forEach((user) => {
    const option = document.createElement("option") as HTMLOptionElement;
    option.id = user.id as string;
    option.value = user.id as string;
    option.textContent = user.username as string;
    selectUserId.appendChild(option);
  });

  // inputs
  const titleInput = generateTextInput(
    "Insert post title",
    "title",
    resource.title as string,
  );

  const contentInput = generateTextInput(
    "Insert post content",
    "content",
    resource.content as string,
  );

  const isActiveInput = generateCheckbox(
    resource.isActive,
    "isActive",
    "Active",
  );

  // submit button
  const modalSubmitButton = generateSubmitButton(resource);

  postForm.append(
    selectUserId,
    titleInput,
    contentInput,
    isActiveInput,
    modalSubmitButton,
  );

  // build modal
  modalContent.appendChild(postForm);

  handleFormSubmit(resource, postForm, modalSubmitButton);

  return modalContent;
}

async function commentModal(resource: Comment): Promise<HTMLDivElement> {
  // form
  const commentForm = createForm();

  // select post
  const selectPostId = document.createElement("select") as HTMLSelectElement;
  selectPostId.name = "postId";
  const posts = (await getAllData("posts")) as Post[];

  if (posts.length === 0) {
    const postsEmpty = document.createElement("p") as HTMLParagraphElement;
    postsEmpty.textContent =
      "Cannot create comment without post. Create a post first!";
    postsEmpty.classList.add(
      "text-red-700",
      "text-md",
      "md:text-lg",
      "xl:text-2xl",
      "text-center",
    );
    modalContent.appendChild(postsEmpty);
    return modalContent;
  }

  posts.forEach((post) => {
    const option = document.createElement("option") as HTMLOptionElement;
    option.id = post.id as string;
    option.value = post.id as string;
    option.textContent = post.title as string;
    selectPostId.appendChild(option);
  });

  const contentInput = generateTextInput(
    "Insert comment content",
    "content",
    resource.content as string,
  );

  const isActiveInput = generateCheckbox(
    resource.isActive,
    "isActive",
    "Active",
  );

  // submit button
  const modalSubmitButton = generateSubmitButton(resource);

  commentForm.append(
    selectPostId,
    contentInput,
    isActiveInput,
    modalSubmitButton,
  );

  // build modal
  modalContent.appendChild(commentForm);

  handleFormSubmit(resource, commentForm, modalSubmitButton);

  return modalContent;
}

async function roleModal(resource: Role): Promise<HTMLDivElement> {
  // form
  const roleForm = createForm();

  // inputs
  const nameInput = generateTextInput(
    "Insert role name",
    "name",
    resource.name as string,
  );

  const isActiveInput = generateCheckbox(
    resource.isActive,
    "isActive",
    "Active",
  );

  // submit button
  const modalSubmitButton = generateSubmitButton(resource);

  roleForm.append(nameInput, isActiveInput, modalSubmitButton);

  // build modal
  modalContent.appendChild(roleForm);

  handleFormSubmit(resource, roleForm, modalSubmitButton);

  return modalContent;
}

async function moveIntoTrash(resource: Resource): Promise<HTMLDivElement> {
  const deleteMessage = document.createElement("p") as HTMLParagraphElement;
  deleteMessage.classList.add(
    "text-center",
    "text-red-600",
    "text-md",
    "md:text-lg",
    "xl:text-2xl",
  );

  deleteMessage.textContent = `Are you sure you want to delete ${resource.id}?`;

  const modalSubmitButton = generateSubmitButton(resource);
  modalSubmitButton.textContent = "Delete";
  modalSubmitButton.addEventListener("click", async () => {
    await softDelete(resource);
    const { currentResource } = await import("../main.js");
    const updated = await handleFetch(currentResource);
    displayData(updated);
    (document.querySelector("#close-modal") as HTMLButtonElement).click();
  });

  modalContent.append(deleteMessage, modalSubmitButton);
  return modalContent;
}

// sistemare delete
async function trashModal(resources: Resource[]): Promise<void> {
  if (resources.length === 0) {
    const emptyTrash = document.createElement("p") as HTMLParagraphElement;
    emptyTrash.textContent = "Trash is empty for this resource!";
    emptyTrash.classList.add(
      "text-md",
      "md:text-lg",
      "xl:text-2xl",
      "text-center",
    );
    modalContent.appendChild(emptyTrash);
    return;
  }

  resources.forEach((element) => {
    const row = document.createElement("div") as HTMLDivElement;
    row.classList.add("flex", "items-center", "justify-between");

    const text = document.createElement("p") as HTMLParagraphElement;
    text.textContent = element.id as string;
    text.classList.add("text-md", "md:text-lg", "xl:text-2xl");
    row.appendChild(text);

    const restoreButton = document.createElement("button") as HTMLButtonElement;
    restoreButton.type = "button";
    restoreButton.textContent = "Restore";
    restoreButton.classList.add(
      "p-1",
      "text-black",
      "rounded-md",
      "cursor-pointer",
      "bg-green-400/90",
      "text-md",
      "md:text-lg",
      "xl:text-2xl",
      "hover:bg-green-400/80",
      "hover:text-slate-950",
    );
    restoreButton.addEventListener("click", () =>
      handleUpdate({
        ...element,
        isActive: true,
      }),
    );
    row.appendChild(restoreButton);

    const deleteButton = document.createElement("button") as HTMLButtonElement;
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add(
      "p-1",
      "text-black",
      "rounded-md",
      "cursor-pointer",
      "bg-red-400/90",
      "text-md",
      "md:text-lg",
      "xl:text-2xl",
      "hover:bg-red-400/80",
      "hover:text-slate-950",
    );
    deleteButton.addEventListener("click", () => hardDelete(element));
    row.appendChild(deleteButton);

    modalContent.appendChild(row);
  });
}

export {
  userModal,
  postModal,
  commentModal,
  roleModal,
  trashModal,
  moveIntoTrash,
};
