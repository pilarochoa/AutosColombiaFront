export interface IZone {
  _id?: string;
  key?: string;
  name: string;
  __v?: number;
}

export interface IZonePropsComponent {
  dataSource: IZone[] | [];
  loading: boolean;
  handleDelete: Function;
}

export interface IZoneFormPropsComponent {
  dataZone?: IZone;
  edit?: boolean;
  loading: boolean;
  handleSubmit: Function;
}
