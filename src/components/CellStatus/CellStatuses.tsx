import { Table } from "../Common/Table";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { ICellStatus, ICellStatusPropsComponent } from "../../interfaces/cellStatus";
import { Tag } from "antd";

export const CellStatuses = ({
  dataSource,
  loading,
  handleDelete
}: ICellStatusPropsComponent) => {
  const navigate = useNavigate();
  
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Disponible',
      dataIndex: 'available',
      key: 'available',
      render: (text: any, record: ICellStatus) => {
        const texto = record.available === "S" ? "Si" : "No";
        const color = record.color;
        return (
          <span>
            <Tag color={color}>
              {texto}
            </Tag>
          </span>
        );
      },
    }
  ];

  const onDelete = (id: string) => {
    handleDelete(id);
  };

  return (
    <Table
      title="Estados de celda"
      columns={columns}
      dataSource={dataSource}
      addButtons={[
        {
          text: 'Agregar Estado Celda',
          icon: <AppstoreOutlined />,
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
          confirm: '¿Está seguro que desea eliminar este estado?',
          onClick: (record: any) => onDelete(record._id),
        },
      ]}
      loading={loading}
    />
  );
};