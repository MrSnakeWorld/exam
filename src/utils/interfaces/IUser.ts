export interface IUser {
  id: number;
  firstName: string;
  lastName?: string;
  age: number;
  email: string;
  password: string;
  isAdmin?: 0 | 1;
}
