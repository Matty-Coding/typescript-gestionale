import { modal } from "./selectors.js";

function closeModal(): void {
  modal.classList.add("hidden");
}

export { closeModal };
