import { Table } from "../Common/Table";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { IRegister, IRegisterPropsComponent } from "../../interfaces/register";
import moment from "moment";

export const Registers = ({
  dataSource,
  loading,
  handleDelete
}: IRegisterPropsComponent) => {
  const navigate = useNavigate();
  
  const columns = [
    {
      title: 'Placa',
      dataIndex: 'placa',
      key: 'placa',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Cliente',
      dataIndex: 'customer',
      key: 'customer',
      render: (text: any, record: IRegister) => {
        return record.customer.name
      }
    },
    {
      title: 'Celda',
      dataIndex: 'cell',
      key: 'cell',
      render: (text: any, record: IRegister) => {
        return record.cell.name
      }
    },
    {
      title: 'Fecha Inicio',
      dataIndex: 'dateInicio',
      key: 'dateInicio',
      render: (text: any, record: IRegister) => {
        return moment(record.dateInicio).format('DD-MM-YYYY');
      }
    },
    {
      title: 'Fecha Fin',
      dataIndex: 'dateEnd',
      key: 'dateEnd',
      render: (text: any, record: IRegister) => {
        return moment(record.dateEnd).format('DD-MM-YYYY');
      }
    }
  ];

  const onDelete = (id: string) => {
    console.log('id == ', id)
    handleDelete(id);
  };

  return (
    <Table
      title="Registros"
      columns={columns}
      dataSource={dataSource}
      addButtons={[
        {
          text: 'Agregar Registro',
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
          confirm: '¿Está seguro que desea eliminar este registro?',
          onClick: (record: any) => onDelete(record._id),
        },
      ]}
      loading={loading}
    />
  );
};