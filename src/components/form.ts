function createForm(): HTMLFormElement {
  const form = document.createElement("form") as HTMLFormElement;
  form.classList.add(
    "flex",
    "flex-col",
    "gap-2",
    "text-md",
    "md:text-lg",
    "xl:text-2xl",
  );
  return form;
}

export { createForm };
