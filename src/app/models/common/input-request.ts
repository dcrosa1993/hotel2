export interface InputRequest<T> {
  data?: T;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
