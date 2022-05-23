export interface ICellStatus {
  _id?: string;
  key?: string;
  name: string;
  available: string;
  color: string;
  __v?: number;
}

export interface ICellStatusPropsComponent {
  dataSource: ICellStatus[] | [];
  loading: boolean;
  handleDelete: Function;
}

export interface ICellStatusFormPropsComponent {
  dataCellStatus?: ICellStatus;
  edit?: boolean;
  loading: boolean;
  handleSubmit: Function;
}
