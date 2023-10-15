import { AjaxState } from '@lob/shared/data-management/data';

export function createAjaxState<T, E extends Error = Error>(data: T, loading = false, error: E | null = null) {
  return {
    data,
    loading,
    error
  } as AjaxState<T, E>;
}
