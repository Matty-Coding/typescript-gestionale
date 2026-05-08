import type { BaseInterface, Resource } from "./types.js";
import { getAllData } from "./services/api.js";
import { capitalize } from "./utils/capitalize.js";

// =============  selectors  ===============
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
    if (header !== "id" && !header.endsWith("Id") && header !== "type") {
      const headerCell = document.createElement("th") as HTMLTableCellElement;
      headerCell.classList.add(
        "border",
        "border-collapse",
        "text-center",
        "p-1",
      );
      headerCell.textContent =
        header === "isActive" ? "Active" : capitalize(header);
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
      if (key !== "id" && !key.endsWith("Id") && key !== "type") {
        const dataCell = document.createElement("td") as HTMLTableCellElement;
        dataCell.classList.add(
          "border",
          "border-collapse",
          "text-center",
          "p-1",
          "max-w-20",
          "truncate",
        );

        // fill dataCell with icon if value = bool
        if (typeof value === "boolean") {
          const icon = document.createElement("i");
          icon.classList.add(
            "bi",
            value ? "bi-check-circle-fill" : "bi-x-circle-fill",
            value ? "text-green-400" : "text-red-400",
          );
          dataCell.appendChild(icon);
        } else {
          dataCell.textContent = value as string;
        }

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
    updateButton.setAttribute("data-action", "update");
    updateButton.classList.add(
      "bi",
      "bi-pencil",
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

    const deleteButton = document.createElement("button") as HTMLButtonElement;
    deleteButton.setAttribute("data-action", "delete");
    deleteButton.classList.add(
      "bi",
      "bi-trash",
      "px-1",
      "text-black",
      "rounded-md",
      "cursor-pointer",
      "bg-red-400/90",
      "text-md",
      "md:text-lg",
      "xl:text-2xl",
      "hover:bg-red-500/80",
      "hover:text-slate-950",
    );

    actionsCell.appendChild(updateButton);
    actionsCell.appendChild(deleteButton);
    dataRow.appendChild(actionsCell);
    tableBody.appendChild(dataRow);
  });
}

async function handleFetch(field: string): Promise<Resource[]> {
  const data = await getAllData(field);
  const activeData = data.filter((element) => element.isActive);

  // empty statement or show data
  if (data.length === 0) {
    tableHead.classList.add("hidden");
    tableBody.classList.add("hidden");
    statement.classList.remove("hidden");
  } else {
    addResourceButton.classList.remove("hidden");
    tableHead.classList.remove("hidden");
    tableBody.classList.remove("hidden");
    statement.classList.add("hidden");
  }
  dashboardTitle.textContent = capitalize(field);

  return activeData as Resource[];
}

export { displayData, handleFetch, addResourceButton };
