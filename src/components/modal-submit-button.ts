import type { Resource } from "../types/resources.js";
import { capitalize } from "../utils/capitalize.js";

function generateSubmitButton(resource: Resource): HTMLButtonElement {
  const modalSubmitButton = document.createElement(
    "button",
  ) as HTMLButtonElement;

  modalSubmitButton.type = "submit";

  modalSubmitButton.textContent = `${!resource.id ? "Create" : "Update"} ${capitalize(resource.type)}`;

  modalSubmitButton.classList.add(
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
    "w-full",
  );
  return modalSubmitButton;
}

export { generateSubmitButton };
