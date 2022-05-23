import { Table } from "../Common/Table";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { IUserPropsComponent } from "../../interfaces/user";

export const Users = ({
  dataSource,
  loading,
  handleDelete
}: IUserPropsComponent) => {
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
    console.log('id == ', id)
    handleDelete(id);
  };

  return (
    <Table
      title="Usuarios"
      columns={columns}
      dataSource={dataSource}
      addButtons={[
        {
          text: 'Agregar Usuario',
          icon: <UserOutlined />,
          onClick: () => navigate("form"),
        },
      ]}
      addActions={[
        {
          text: 'Editar',
          icon: <EditOutlined />,
          type: 'primary',
          onClick: (record: any) => {
            debugger;
            navigate(`form/${record._id}`);
          }
        },
        {
          text: 'Eliminar',
          icon: <DeleteOutlined />,
          type: 'danger',
          okText: "Aceptar",
          confirm: '¿Está seguro que desea eliminar este usuario?',
          onClick: (record: any) => onDelete(record._id),
        },
      ]}
      loading={loading}
    />
  );
};