import { Table } from "../Common/Table";
import { useNavigate } from "react-router-dom";
import {
  BorderHorizontalOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { IZonePropsComponent } from "../../interfaces/zone";

export const Zones = ({
  dataSource,
  loading,
  handleDelete
}: IZonePropsComponent) => {
  const navigate = useNavigate();
  
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    }
  ];

  const onDelete = (id: string) => {
    handleDelete(id);
  };

  return (
    <Table
      title="Zonas"
      columns={columns}
      dataSource={dataSource}
      addButtons={[
        {
          text: 'Agregar Zona',
          icon: <BorderHorizontalOutlined />,
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
          confirm: '¿Está seguro que desea eliminar esta zona?',
          onClick: (record: any) => onDelete(record._id),
        },
      ]}
      loading={loading}
    />
  );
};