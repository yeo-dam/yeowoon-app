export default interface Entity<T> {
  items: T[];
  total: number;
  count: number;
  limit: number;
  offset: number;
}
