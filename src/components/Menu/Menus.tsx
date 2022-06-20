import { Table } from "../Common/Table";
import { useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { IMenu, IMenuPropsComponent } from "../../interfaces/menu";

export const Menus = ({
  dataSource,
  loading,
  handleDelete
}: IMenuPropsComponent) => {
  const navigate = useNavigate();
  
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Llave menú',
      dataIndex: 'keyMenu',
      key: 'keyMenu'
    },
    {
      title: 'Roles',
      dataIndex: 'roles',
      key: 'roles',
      render: (text: any, record: IMenu) => record.roles.map(role => role.name)
    }
  ];

  const onDelete = (id: string) => {
    handleDelete(id);
  };

  return (
    <Table
      title="Menús"
      columns={columns}
      dataSource={dataSource}
      addButtons={[
        {
          text: 'Agregar Menu',
          icon: <MenuUnfoldOutlined />,
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
          confirm: '¿Está seguro que desea eliminar esta opcion de menú?',
          onClick: (record: any) => onDelete(record._id),
        },
      ]}
      loading={loading}
    />
  );
};