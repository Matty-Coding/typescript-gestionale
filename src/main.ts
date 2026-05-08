import {
  displayData,
  handleFetch,
  addResourceButton,
} from "./ui-management.js";
import { openModal, openTrashModal } from "./components/modal/load-content.js";
import type { Resource } from "./types.js";
import { closeModal } from "./utils/close-modal.js";
import { getAllData } from "./services/api.js";

export let currentResource: string = "users";

// toggle sidebar
const sideBar = document.querySelector("aside") as HTMLElement;
const hamburgerMenu = document.querySelector("#hamburger-icon") as HTMLElement;
const tableBody = document.querySelector(
  "#table-body",
) as HTMLTableSectionElement;

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
  const activeData = data.filter((element) => element.isActive === true);
  displayData(activeData);
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

// listener to open trash
const trashButton = document.querySelector("#trash") as HTMLButtonElement;

trashButton.addEventListener("click", async (): Promise<void> => {
  const data = await getAllData(currentResource as string);

  // filter only inactive resources
  const deleted = data.filter((element) => !element.isActive);
  openTrashModal(deleted);
});

// listener to close modal
document.querySelector("#close-modal")?.addEventListener("click", closeModal);

// listener to open modal on table
tableBody.addEventListener("click", async (event: Event) => {
  const target = event.target as HTMLElement;
  const row = target.closest("tr") as HTMLTableRowElement;

  if (!row) return;

  const id = row.getAttribute("data-id") as string;

  const data = await getAllData(currentResource as string);
  const activeData = data.filter((element) => element.isActive === true);
  const selectedData = {
    ...activeData.find((element) => element.id === id),
    type: currentResource.slice(0, -1),
  } as Resource;

  if (target.closest("button[data-action='update']")) {
    openModal(selectedData);
  }

  if (target.closest("[data-action='delete']")) {
    openModal(selectedData, true);
  }
});
