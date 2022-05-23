import { Form, Input, Button, Row, Col, Select, Spin, Alert } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICellFormPropsComponent } from "../../interfaces/cell";
import { ICellStatus } from "../../interfaces/cellStatus";
import { IZone } from "../../interfaces/zone";
import "../../sass/form.scss";

const { Option } = Select;

export const CellForm = ({
  dataSelects,
  handleSubmit,
  dataCell,
  edit,
  loading,
  showError,
  setShowError
}: ICellFormPropsComponent) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const text = edit ? 'editada' : 'creada';
    const message = `La celda ha sido ${text} con éxito.`;
    handleSubmit({ ...values }, message);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (edit && dataCell) {
      form.setFieldsValue({
        ...dataCell
      });
    }
  }, [edit, dataCell]);

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>
          {edit ? 'Editar celda' : 'Crear celda'}
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'Por favor ingrese el nombre!' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Zona"
            name="zone"
            rules={[{ required: true, message: 'Por favor ingrese la zona!' }]}
          >
            <Select allowClear>
              {dataSelects.dataZone.map((zone: IZone, index: number) =>
                <Option
                  key={`option-key-${index}`}
                  value={zone._id}
                >
                  {zone.name}
                </Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Estado celda"
            name="cellStatus"
            rules={[{ required: true, message: 'Por favor ingrese el estado de la zona!' }]}
          >
            <Select allowClear>
              {dataSelects.dataCellStatus.map((cellStatus: ICellStatus, index: number) =>
                <Option
                  key={`option-key-${index}`}
                  value={cellStatus._id}
                >
                  {cellStatus.name}
                </Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
            <Row className="row-buttons-form">
              <Button type="primary" htmlType="submit">
                {edit ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button type="ghost" onClick={() => navigate("/cell", { replace: true })}>
                Cancelar
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Spin>
      {showError.show && (
        <Alert
          message={showError.message}
          type="warning"
          showIcon
          closable
          onClose={() => {
            if (setShowError) {
              setShowError({
                show: false,
                message: ""
              });
            }
          }}
        />
      )}
    </>
  );
};