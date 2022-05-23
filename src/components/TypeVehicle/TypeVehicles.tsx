import { Table } from "../Common/Table";
import { useNavigate } from "react-router-dom";
import {
  PicLeftOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { ITypeVehiclePropsComponent } from "../../interfaces/typeVehicle";

export const TypeVehicles = ({
  dataSource,
  loading,
  handleDelete
}: ITypeVehiclePropsComponent) => {
  const navigate = useNavigate();
  
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Valor mes',
      dataIndex: 'tafifaMes',
      key: 'tafifaMes'
    },
    {
      title: 'Valor día',
      dataIndex: 'tafifaDia',
      key: 'tafifaDia'
    }
  ];

  const onDelete = (id: string) => {
    handleDelete(id);
  };

  return (
    <Table
      title="Tipo vehículo"
      columns={columns}
      dataSource={dataSource}
      addButtons={[
        {
          text: 'Agregar Tipo vehículo',
          icon: <PicLeftOutlined />,
          onClick: () => navigate("form"),
        },
      ]}
      addActions={[
        {
          text: 'Editar',
          icon: <EditOutlined />,
          type: 'primary',
          onClick: (record: any) => navigate(`form/${record._id}`),
        },
        {
          text: 'Eliminar',
          icon: <DeleteOutlined />,
          type: 'danger',
          okText: "Aceptar",
          confirm: '¿Está seguro que desea eliminar este tipo vehículo?',
          onClick: (record: any) => onDelete(record._id),
        },
      ]}
      loading={loading}
    />
  );
};