// utils/resolveContentURL.js

export function mediaBaseURL() {
    return "https://static.lytude.com";
}

/**
 * @param {string | null | undefined} urlString
 * @param {string | null} [cropType]
 * @param {{ width: number, height: number } | null} [size]
 * @returns {string}
 */

  export function resolveContentURL(urlString, cropType, size) {
  // Only transform if URL belongs to ImageKit
  if (!urlString.startsWith("https://ik.imagekit.io/lytude/")) {
    return urlString;
  }

  // If no size given, just return original
  if (!size?.width || !size?.height) {
    return urlString;
  }

  const ctype = cropType.toLowerCase() === "scaledToFill" ? "at_max" : "at_least";
  return `${urlString}?tr=w-${size.width},h-${size.height},c-${ctype}`;
}
