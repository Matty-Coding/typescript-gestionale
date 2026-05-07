import {
  displayData,
  handleFetch,
  addResourceButton,
} from "./ui-management.js";
import { openModal } from "./modal/load-content.js";
import type { Resource } from "./types.js";
import { closeModal } from "./utils/close-modal.js";

export let currentResource: string = "users";

// toggle sidebar
const sideBar = document.querySelector("aside") as HTMLElement;
const hamburgerMenu = document.querySelector("#hamburger-icon") as HTMLElement;

hamburgerMenu.onclick = function (): void {
  sideBar.classList.toggle("-translate-x-[105%]");
  sideBar.classList.toggle("translate-x-0");
};

const resourcesList = document.querySelector(
  "#resources-list",
) as HTMLUListElement;

// resource listener to display data
resourcesList.addEventListener("click", async (e: Event) => {
  // select list item
  const target = (e.target as HTMLLIElement).closest("li");

  // take text content from list item
  let field = target?.textContent as string;

  // normalize field name to build url
  field = field.trim().toLowerCase();

  currentResource = field;

  const data = await handleFetch(field);
  displayData(data);
});

// on page load try to load users resource and eventually display it
window.onload = async function (): Promise<void> {
  const users = await handleFetch("users");
  addResourceButton.classList.remove("hidden");
  addResourceButton.classList.add("flex");
  displayData(users);
};

// listener to open modal on current resource
addResourceButton.addEventListener("click", (): void => {
  const templates: Record<string, Resource> = {
    users: { id: "", type: "user", username: "", roleId: "", isActive: true },
    posts: {
      id: "",
      type: "post",
      title: "",
      content: "",
      isActive: true,
      userId: "",
    },
    comments: {
      id: "",
      type: "comment",
      postId: "",
      content: "",
      isActive: true,
    },
    roles: { id: "", type: "role", name: "", count: 0, isActive: true },
  };

  openModal(templates[currentResource] as Resource);
});

// listener to close modal
document.querySelector("#close-modal")?.addEventListener("click", closeModal);
