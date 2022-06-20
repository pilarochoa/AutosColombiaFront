import { Table } from "../Common/Table";
import { useNavigate } from "react-router-dom";
import {
  BorderOuterOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { ICell, ICellPropsComponent } from "../../interfaces/cell";
import { Tag } from "antd";

export const Cells = ({
  dataSource,
  loading,
  handleDelete
}: ICellPropsComponent) => {
  const navigate = useNavigate();
  
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Zona',
      dataIndex: 'zone',
      key: 'zone',
      render: (text: any, record: ICell) => record?.zone?.name
    },
    {
      title: 'Estado celda',
      dataIndex: 'cellStatus',
      key: 'cellStatus',
      render: (text: any, record: ICell) => {
        const texto = record.cellStatus?.available === "S" ? "Si" : "No";
        const color = record.cellStatus?.color;
        return (
          <span>
            <Tag color={color}>
              {texto}
            </Tag>
          </span>
        );
      }
    }
  ];

  const onDelete = (id: string) => {
    handleDelete(id);
  };

  return (
    <Table
      title="Celdas"
      columns={columns}
      dataSource={dataSource}
      addButtons={[
        {
          text: 'Agregar Celda',
          icon: <BorderOuterOutlined />,
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
          confirm: '¿Está seguro que desea eliminar esta celda?',
          onClick: (record: any) => onDelete(record._id),
        },
      ]}
      loading={loading}
    />
  );
};