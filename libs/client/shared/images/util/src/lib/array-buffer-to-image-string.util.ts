export function arrayBufferToImageString(buf: ArrayBuffer): string {
  if (buf) {
    return btoa(
      Array.from(new Uint8Array(buf))
        .map((b) => String.fromCharCode(b))
        .join('')
    );
  }
  return '';
}
