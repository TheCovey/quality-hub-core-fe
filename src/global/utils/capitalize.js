// This utility function capitalizes the first letters of each word in a string when separated by a _
export const capitalize = string =>
  string
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
