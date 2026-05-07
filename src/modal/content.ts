import type { User, Role, Post, Comment } from "../types.js";
import { getAllData } from "../services/api.js";
import { createForm } from "../components/form.js";
import { generateTextInput } from "../components/text-input.js";
import { generateCheckbox } from "../components/checkbox-input.js";
import { generateSubmitButton } from "../components/modal-submit-button.js";
import { handleFormSubmit } from "../services/resource-submit.js";

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
  handleFormSubmit(resource, userForm);

  return modalContent;
}

async function postModal(resource: Post): Promise<HTMLDivElement> {
  // form
  const postForm = createForm();

  // select user
  const selectUserId = document.createElement("select") as HTMLSelectElement;
  selectUserId.name = "userId";
  const users = (await getAllData("users")) as User[];
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

  handleFormSubmit(resource, postForm);

  return modalContent;
}

async function commentModal(resource: Comment): Promise<HTMLDivElement> {
  // form
  const commentForm = createForm();

  // select post
  const selectPostId = document.createElement("select") as HTMLSelectElement;
  selectPostId.name = "postId";
  const posts = (await getAllData("posts")) as Post[];
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

  handleFormSubmit(resource, commentForm);

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

  const roleCounter = document.createElement("input") as HTMLInputElement;
  roleCounter.type = "number";
  roleCounter.name = "count";
  roleCounter.value = String(resource.count) as string;

  const isActiveInput = generateCheckbox(
    resource.isActive,
    "isActive",
    "Active",
  );

  // submit button
  const modalSubmitButton = generateSubmitButton(resource);

  if (!resource.id) roleCounter.disabled = true;

  roleForm.append(nameInput, roleCounter, isActiveInput, modalSubmitButton);

  // build modal
  modalContent.appendChild(roleForm);

  handleFormSubmit(resource, roleForm);

  return modalContent;
}

export { userModal, postModal, commentModal, roleModal };
