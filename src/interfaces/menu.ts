import { ReactNode } from "react";
import { IRole } from "./user";

export interface IMenu {
  _id?: string;
  name: string;
  roles: IRole[] | [];
  icon: string;
  key?: string;
  __v?: number;
}

export interface IMenuPropsComponent {
  dataSource: IMenu[] | [];
  loading: boolean;
  handleDelete: Function;
}

export interface IMenuFormPropsComponent {
  dataRole: IRole[] | [];
  dataMenu?: IMenu;
  edit?: boolean;
  loading: boolean;
  handleSubmit: Function;
  showError?: any;
  setShowError?: Function;
  selectsData: ISelectsDataMenu;
}

export interface IListKeyMenu {
  key: string;
  value: ReactNode | string;
}

export interface ISelectsDataMenu {
  listKeyMenu: IListKeyMenu[] | [];
  listIcons: IListKeyMenu[] | []
}
