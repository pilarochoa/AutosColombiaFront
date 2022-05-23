import { ICellStatus } from "./cellStatus";
import { IZone } from "./zone";

export interface ICell {
  _id?: string;
  key?: string;
  name: string;
  zone: IZone;
  cellStatus: ICellStatus;
  __v?: number;
}

export interface ICellPropsComponent {
  dataSource: ICell[] | [];
  loading: boolean;
  handleDelete: Function;
}

export interface IDataSelect {
  dataZone: IZone[] | [];
  dataCellStatus: ICellStatus[] | [];
}

export interface ICellFormPropsComponent {
  dataSelects: IDataSelect;
  dataCell?: ICell;
  edit?: boolean;
  loading: boolean;
  handleSubmit: Function;
  showError?: any;
  setShowError?: Function;
}