import { IRegister } from "./register";
import { IUser } from "./user";

export interface IPayment {
  _id?: string;
  placa: string;
  dataPayment: Date;
  price: number;
  autor: IUser;
  register?: IRegister;
  __v?: number;
}

export interface IPaymentFormPropsComponent {
  handleSubmit: Function;
  dataRegister?: IRegister;
  getPriceRegisterByPlaca: Function;
  loading: boolean;
  showError?: any;
  setShowError?: Function;
}
