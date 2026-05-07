function closeModal(): void {
  const modal = document.querySelector("#modal") as HTMLDivElement;
  modal.classList.add("hidden");
}

export { closeModal };
