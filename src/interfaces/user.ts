export interface IRole {
  _id?: string;
  name: string;
  __v?: number;
}

export interface IUser {
  _id?: string;
  key?: string;
  document: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  rol: IRole;
  typeDocument: string;
  __v?: number;
}