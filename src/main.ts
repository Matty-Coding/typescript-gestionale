// toggle sidebar
const sideBar = document.querySelector("aside") as HTMLElement;
const hamburgerMenu = document.querySelector("#hamburger-icon") as HTMLElement;

hamburgerMenu.onclick = function (): void {
  sideBar.classList.toggle("-translate-x-[105%]");
  sideBar.classList.toggle("translate-x-0");
};

// =============  interfaces  =============

// base interface for all resources
interface BaseInterface {
  id: string;
}
interface User extends BaseInterface {
  username: string;
  roleId: string;
  isActive: boolean;
}

interface Post extends BaseInterface {
  userId: string;
  title: string;
  body: string;
  comments: string;
  isActive: boolean;
}

interface Comment extends BaseInterface {
  postId: string;
  body: string;
  isActive: boolean;
}

interface Role extends BaseInterface {
  name: string;
  count: number;
}

// union type
type Resource = User | Post | Comment | Role;

async function fetchData(field: string): Promise<Resource[]> {
  try {
    const localhost: string = "http://localhost:3000";
    const response: Response = await fetch(`${localhost}/${field}`);
    return response.json();
  } catch (error) {
    console.error(`Network error: ${error}`);
    return [];
  }
}

// global selectors to display data and manage statement
const dashboardTitle = document.querySelector(
  "#dashboard-title",
) as HTMLHeadingElement;

const addResourceButton = document.querySelector(
  "#add-resource",
) as HTMLButtonElement;

const tableHead = document.querySelector(
  "#table-head",
) as HTMLTableSectionElement;

const tableBody = document.querySelector(
  "#table-body",
) as HTMLTableSectionElement;

const statement = document.querySelector("#statement") as HTMLParagraphElement;

function displayData(data: Resource[]): void {
  // reset table
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  if (data.length === 0) {
    statement.textContent = "No data found";
    return;
  } else if (!data) {
    statement.textContent = "Error fetching data";
    return;
  }

  // table headers
  const headersRow = document.createElement("tr") as HTMLTableRowElement;
  headersRow.classList.add("bg-indigo-700/90");
  Object.keys(data[0] as BaseInterface).forEach((header) => {
    if (header !== "id" && !header.endsWith("Id")) {
      const headerCell = document.createElement("th") as HTMLTableCellElement;
      headerCell.classList.add(
        "border",
        "border-collapse",
        "text-center",
        "p-1",
      );
      headerCell.textContent =
        `${header.charAt(0).toUpperCase()}${header.slice(1).toLowerCase()}` as string;
      headersRow.appendChild(headerCell);
    }
  });
  const actionsColumn = document.createElement("th") as HTMLTableCellElement;
  actionsColumn.classList.add(
    "border",
    "border-collapse",
    "text-center",
    "p-1",
  );
  actionsColumn.textContent = "Actions";
  headersRow.appendChild(actionsColumn);
  tableHead.appendChild(headersRow);

  // table records
  data.forEach((element) => {
    const dataRow = document.createElement("tr") as HTMLTableRowElement;
    dataRow.classList.add("odd:bg-indigo-400/90", "even:bg-indigo-500/90");
    dataRow.dataset.id = element.id;
    for (const [key, value] of Object.entries(element)) {
      if (key !== "id" && !key.endsWith("Id")) {
        const dataCell = document.createElement("td") as HTMLTableCellElement;
        dataCell.classList.add(
          "border",
          "border-collapse",
          "text-center",
          "p-1",
          "truncate",
          "text-nowrap",
        );
        dataCell.textContent = value as string;
        dataRow.appendChild(dataCell);
      }
    }
    const actionsCell = document.createElement("td") as HTMLTableCellElement;
    actionsCell.classList.add(
      "flex",
      "gap-2",
      "justify-center",
      "items-center",
      "p-1",
      "text-sm",
      "md:text-md",
      "xl:text-lg",
      "border",
      "border-collapse",
    );

    const updateButton = document.createElement("button") as HTMLButtonElement;
    const deleteButton = document.createElement("button") as HTMLButtonElement;

    updateButton.textContent = "Update";
    updateButton.classList.add(
      "px-1",
      "text-black",
      "rounded-md",
      "cursor-pointer",
      "bg-yellow-400/90",
      "text-md",
      "md:text-lg",
      "xl:text-2xl",
      "hover:bg-yellow-500/80",
      "hover:text-slate-950",
    );
    deleteButton.textContent = "Delete";
    deleteButton.classList.add(
      "px-1",
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

    actionsCell.appendChild(updateButton);
    actionsCell.appendChild(deleteButton);
    dataRow.appendChild(actionsCell);
    tableBody.appendChild(dataRow);
  });
}

async function handleFetch(field: string): Promise<Resource[]> {
  const data = await fetchData(field);

  // empty statement or show data
  if (data.length === 0) {
    dashboardTitle.textContent = "";
    tableHead.classList.add("hidden");
    tableBody.classList.add("hidden");
    statement.classList.remove("hidden");
  } else {
    dashboardTitle.textContent = field;
    addResourceButton.classList.remove("hidden");
    tableHead.classList.remove("hidden");
    tableBody.classList.remove("hidden");
    statement.classList.add("hidden");
  }

  return data as Resource[];
}

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

  const data = await handleFetch(field);
  displayData(data);
});

// =================  init  ====================

const users = await handleFetch("users");
addResourceButton.classList.remove("hidden");
displayData(users);
