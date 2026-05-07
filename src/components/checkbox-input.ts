function generateCheckbox(
  checked: boolean,
  name: string,
  label: string,
): HTMLDivElement {
  const checkboxContainer = document.createElement("div") as HTMLDivElement;

  const labelElement = document.createElement("label") as HTMLLabelElement;
  labelElement.textContent = label;
  labelElement.htmlFor = name;

  const checkboxInput = document.createElement("input") as HTMLInputElement;
  checkboxInput.type = "checkbox";
  checkboxInput.name = name;
  checkboxInput.checked = checked;

  checkboxContainer.append(labelElement, checkboxInput);

  return checkboxContainer;
}

export { generateCheckbox };
