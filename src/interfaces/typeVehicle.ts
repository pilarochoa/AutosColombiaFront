export interface ITypeVehicle {
  _id?: string;
  key?: string;
  name: string;
  tafifaMes: number;
  tafifaDia: number;
  __v?: number;
}

export interface ITypeVehiclePropsComponent {
  dataSource: ITypeVehicle[] | [];
  loading: boolean;
  handleDelete: Function;
}

export interface ITypeVehicleFormPropsComponent {
  dataTypeVehicle?: ITypeVehicle;
  edit?: boolean;
  loading: boolean;
  handleSubmit: Function;
}
