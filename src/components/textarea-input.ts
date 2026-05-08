function generateTextArea(
  placeholder: string,
  name: string,
  value?: string,
): HTMLTextAreaElement {
  const textarea = document.createElement("textarea") as HTMLTextAreaElement;
  textarea.classList.add("w-full", "h-20", "p-2", "border", "rounded-lg");
  textarea.name = name;
  textarea.placeholder = placeholder;
  textarea.value = (value || "") as string;
  return textarea;
}

export { generateTextArea };
