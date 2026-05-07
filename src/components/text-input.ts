function generateTextInput(
  placeholder: string,
  name: string,
  value?: string | null,
): HTMLInputElement {
  const textInput = document.createElement("input") as HTMLInputElement;

  textInput.type = "text";
  textInput.name = name;
  textInput.value = (value || "") as string;
  textInput.placeholder = placeholder;
  textInput.required = true;
  textInput.autocomplete = "off";
  textInput.classList.add("border-b", "border-indigo-400/80", "py-2");

  return textInput;
}

export { generateTextInput };
