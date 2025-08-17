export function captalizeWords(text: string): string {
  const formatedText = text
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return formatedText;
}

export function usernameLowerCase(text: string): string {
  return text.trim().toLowerCase().split(" ").join("_");
}
