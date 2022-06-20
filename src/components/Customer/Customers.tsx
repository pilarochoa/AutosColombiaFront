import { Table } from "../Common/Table";
import { useNavigate } from "react-router-dom";
import {
  UsergroupDeleteOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { ICustomerPropsComponent } from "../../interfaces/customer";

export const Customers = ({
  dataSource,
  loading,
  handleDelete
}: ICustomerPropsComponent) => {
  const navigate = useNavigate();
  
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Tipo Documento',
      dataIndex: 'typeDocument',
      key: 'typeDocument',
    },
    {
      title: 'Documento',
      dataIndex: 'document',
      key: 'document',
    },
    {
      title: 'Correo',
      key: 'email',
      dataIndex: 'email'
    }
  ];

  const onDelete = (id: string) => {
    handleDelete(id);
  };

  return (
    <Table
      title="Clientes"
      columns={columns}
      dataSource={dataSource}
      addButtons={[
        {
          text: 'Agregar Cliente',
          icon: <UsergroupDeleteOutlined />,
          onClick: () => navigate("form"),
        },
      ]}
      addActions={[
        {
          text: 'Editar',
          icon: <EditOutlined />,
          type: 'primary',
          onClick: (record: any) => {
            navigate(`form/${record._id}`);
          }
        },
        {
          text: 'Eliminar',
          icon: <DeleteOutlined />,
          type: 'danger',
          okText: "Aceptar",
          confirm: '¿Está seguro que desea eliminar este cliente?',
          onClick: (record: any) => onDelete(record._id),
        },
      ]}
      loading={loading}
    />
  );
};