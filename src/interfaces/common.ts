export interface Identifiable {
  id: string;
}
export interface ApiResponse<T> {
  status: number;
  data: T;
}
