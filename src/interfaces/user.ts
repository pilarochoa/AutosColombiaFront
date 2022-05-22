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
  password?: string;
  phone: string;
  rol: IRole;
  typeDocument: string;
  __v?: number;
}

export interface IUserPropsComponent {
  dataSource: IUser[] | [];
  loading: boolean;
  handleDelete: Function;
}

export interface IUserFormPropsComponent {
  dataRole: IRole[] | [];
  dataUser?: IUser;
  edit?: boolean;
  loading: boolean;
  handleSubmit: Function;
}