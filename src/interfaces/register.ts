import { ICell } from "./cell";
import { ICustomer } from "./customer";
import { ITypeVehicle } from "./typeVehicle";
import { IUser } from "./user";

export interface IRegister {
  _id?: string;
  key?: string;
  placa: string;
  typeVehicle: ITypeVehicle;
  userEnter: IUser;
  userRemove?: IUser;
  cell: ICell;
  customer: ICustomer;
  dateInicio: Date;
  dateEnd: Date;
  __v?: number;
}

export interface IRegisterPropsComponent {
  dataSource: IRegister[] | [];
  loading: boolean;
  handleDelete: Function;
}

export interface IRegisterFormPropsComponent {
  dataSelects: IDataSelectRegister;
  dataRegister?: IRegister;
  edit?: boolean;
  loading: boolean;
  handleSubmit: Function;
  showError?: any;
  setShowError?: Function
}

export interface IDataSelectRegister {
  dataTypeVehicles: ITypeVehicle[] | [];
  dataCells: ICell[] | [];
  dataCustomers: ICustomer[] | []
  
}