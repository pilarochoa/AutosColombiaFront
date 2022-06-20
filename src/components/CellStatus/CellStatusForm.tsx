import { Form, Input, Button, Row, Col, Select, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICellStatusFormPropsComponent } from "../../interfaces/cellStatus";
import { InputColor } from "../Common/InputColor"
import "../../sass/form.scss";

const { Option } = Select;

export const CellStatusForm = ({
  handleSubmit,
  dataCellStatus,
  edit,
  loading
}: ICellStatusFormPropsComponent) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const text = edit ? 'editado' : 'creado';
    const message = `La zona ha sido ${text} con éxito.`;
    handleSubmit({ ...values }, message);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (edit && dataCellStatus) {
      form.setFieldsValue({
        ...dataCellStatus
      });
    }
  }, [edit, dataCellStatus]);

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>
          {edit ? 'Editar estado celda' : 'Crear estado celda'}
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
            label="Disponible"
            name="available"
            rules={[{ required: true, message: 'Por favor ingrese el campo Disponible!' }]}
          >
            <Select>
              <Option value="S">Si</Option>
              <Option value="N">No</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Color"
            name="color"
            rules={[{ required: true, message: 'Por favor ingrese el campo Color!' }]}
          >
            <InputColor
              color={form.getFieldValue('color')}
              form={form}
            />
          </Form.Item>
          
          <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
            <Row className="row-buttons-form">
              <Button type="primary" htmlType="submit">
                {edit ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button type="ghost" onClick={() => navigate("/stateCell", { replace: true })}>
                Cancelar
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};