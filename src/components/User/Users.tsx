import { useState, useEffect } from "react";
import { Table } from "../Common/Table";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { UserService } from "../../services/user";
import { IUser } from "../../interfaces/user";

export const Users = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<IUser[]>([]);

  const getAllUsers = async () => {
    try {
      const users: IUser[] | undefined = await UserService.getAllUsers();
      console.log('users == ', users);
      if (users && users.length > 0) {
        const resultData: IUser[] = users.map((item: IUser) => {
          return { ...item, key: item._id }
        });
        setDataSource(resultData);
      }
      setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log("Error getAllUsers = ",  error);
    }
  }

  useEffect(() => {
    setLoading(true);
    getAllUsers();
  }, []);
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
      dataIndex: 'email',
      render: (text: any) => <a>{text}</a>
    }
  ];

  // const dataSource = [{
  //   id: "1",
  //   name: "Edison",
  //   typeDocument: "CC",
  //   document: 12345,
  //   email: "correo@correo.com"
  // }, {
  //   id: "2",
  //   name: "Pepe",
  //   typeDocument: "CC",
  //   document: 12345,
  //   email: "pepe@correo.com"
  // }]

  const onDelete = (id: string) => {
    console.log('id == ', id)
  };

  return (
    <Table
      title="Users"
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
          text: 'Edit',
          icon: <EditOutlined />,
          type: 'primary',
          onClick: (record: any) =>
          navigate(`/form/${record.id}`),
        },
        {
          text: 'Delete',
          icon: <DeleteOutlined />,
          type: 'danger',
          okText: "Aceptar",
          confirm: 'Esta seguro que desea eliminar este usuario?',
          onClick: (record: any) => onDelete(record.id),
        },
      ]}
      loading={loading}
    />
  );
};