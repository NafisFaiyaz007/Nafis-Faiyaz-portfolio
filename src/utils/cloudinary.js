/**
 * Ask Cloudinary for a right-sized, modern-format version of an image
 * (AVIF/WebP where supported, auto quality, capped width).
 * Non-Cloudinary URLs are returned unchanged.
 */
export const cld = (url, width) =>
  url.includes("res.cloudinary.com") && url.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${width}/`)
    : url;

/** srcSet string for a few widths of the same Cloudinary image. */
export const cldSrcSet = (url, widths) => widths.map((w) => `${cld(url, w)} ${w}w`).join(", ");
