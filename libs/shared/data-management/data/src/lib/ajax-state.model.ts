export interface AjaxState<T, E extends Error = Error> {
  data: T;
  loading: boolean;
  error: E | null;
}
