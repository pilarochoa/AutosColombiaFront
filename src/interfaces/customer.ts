export interface ICustomer {
  _id?: string;
  key?: string;
  name: string;
  typeDocument: string;
  document: string;
  phone: string;
  email: string;
  __v?: number;
}

export interface ICustomerPropsComponent {
  dataSource: ICustomer[] | [];
  loading: boolean;
  handleDelete: Function;
}

export interface ICustomerFormPropsComponent {
  dataCustomer?: ICustomer;
  edit?: boolean;
  loading: boolean;
  handleSubmit: Function;
}