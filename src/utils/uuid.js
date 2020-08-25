/**
 * @fileoverview Defines a function that generates a UUIDv4.
 */

/**
 * Generates a UUIDv4 and returns it as a string.
 * @return {string} The generated UUIDv4
 * @export
 */
export default () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
