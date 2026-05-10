import {
  displayData,
  handleFetch,
  addResourceButton,
} from "./ui-management.js";
import { openModal, openTrashModal } from "./components/modal/load-content.js";
import type { Resource } from "./types/resources.js";
import { closeModal } from "./utils/close-modal.js";
import { getAllData } from "./services/api.js";
import {
  closeModalbutton,
  hamburgerMenu,
  resourcesList,
  sideBar,
  tableBody,
  trashButton,
} from "./utils/selectors.js";
import { addResource } from "./types/add-resource.js";

export let currentResource: string = "users";

hamburgerMenu.onclick = function (): void {
  sideBar.classList.toggle("-translate-x-[105%]");
  sideBar.classList.toggle("translate-x-0");
};

// resource listener to display data
resourcesList.addEventListener("click", async (event: Event) => {
  // select list item
  const target = (event.target as HTMLLIElement).closest("li");

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
  const resources = addResource;

  openModal(resources[currentResource] as Resource);
});

trashButton.addEventListener("click", async (): Promise<void> => {
  const data = await getAllData(currentResource as string);

  // filter only inactive resources
  const deleted = data.filter((element) => !element.isActive);
  openTrashModal(deleted);
});

// listener to close modal
closeModalbutton.addEventListener("click", closeModal);

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
