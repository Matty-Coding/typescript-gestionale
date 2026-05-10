// sidebar + hamburger menu
const sideBar = document.querySelector("aside") as HTMLElement;
const hamburgerMenu = document.querySelector("#hamburger-icon") as HTMLElement;

// resource list in sidebar
const resourcesList = document.querySelector(
  "#resources-list",
) as HTMLUListElement;

// trash button in sidebar
const trashButton = document.querySelector("#trash") as HTMLButtonElement;

// modal container
const modal = document.querySelector("#modal") as HTMLDivElement;

// modal close button
const closeModalbutton = document.querySelector(
  "#close-modal",
) as HTMLButtonElement;

// =========  dashboard  ==============
const dashboardTitle = document.querySelector(
  "#dashboard-title",
) as HTMLHeadingElement;

// add resource button in dashboard
const addResourceButton = document.querySelector(
  "#add-resource",
) as HTMLButtonElement;

// table in dashboard
const tableHead = document.querySelector(
  "#table-head",
) as HTMLTableSectionElement;

const tableBody = document.querySelector(
  "#table-body",
) as HTMLTableSectionElement;

// statement (empty, loading, error, success)
const statement = document.querySelector("#statement") as HTMLParagraphElement;

export {
  sideBar,
  hamburgerMenu,
  resourcesList,
  trashButton,
  modal,
  closeModalbutton,
  dashboardTitle,
  addResourceButton,
  tableHead,
  tableBody,
  statement,
};
