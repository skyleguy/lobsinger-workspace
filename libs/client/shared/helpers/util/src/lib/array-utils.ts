export class ArrayUtils {
  public static getLast<T = unknown>(arr: T[]): T | undefined {
    if (arr.length >= 0) {
      const endIndex = arr.length - 1;
      return arr[endIndex];
    }
    return undefined;
  }
}
