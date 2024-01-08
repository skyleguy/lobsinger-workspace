export interface ContentWrapper<T> {
  role: string;
  id: string;
  creationTime: number;
  content: T[];
}
