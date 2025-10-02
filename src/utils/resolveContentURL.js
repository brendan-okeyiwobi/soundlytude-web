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

function resolveContentURLOLD(urlString, cropType = null, size = null) {
    if (typeof urlString !== "string") {
      console.warn("resolveContentURL expected a string but got:", urlString);
      return "";
    }
  
    if (
      urlString.startsWith("media:image:/") ||
      urlString.startsWith("media:audio:/") ||
      urlString.startsWith("file:doc:/")
    ) {
      let resolvedURL = urlString
        .replace("media:image:/", mediaBaseURL())
        .replace("media:audio:/", mediaBaseURL())
        .replace("file:doc:/", mediaBaseURL());
  
      if (!cropType || !size) {
        return resolvedURL;
      }
  
      if (urlString.startsWith("media:image:/")) {
        resolvedURL += `?cropType=${cropType}&width=${size.width}&height=${size.height}`;
      }
  
      return resolvedURL;
    } else {
      return urlString;
    }
  }
  

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
