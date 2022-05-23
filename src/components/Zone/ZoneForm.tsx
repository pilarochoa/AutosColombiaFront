import { Form, Input, Button, Row, Col, Select, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IZoneFormPropsComponent } from "../../interfaces/zone";
import "../../sass/form.scss";

const { Option } = Select;

export const ZoneForm = ({
  handleSubmit,
  dataZone,
  edit,
  loading
}: IZoneFormPropsComponent) => {
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
    if (edit && dataZone) {
      form.setFieldsValue({
        ...dataZone
      });
    }
  }, [edit, dataZone]);

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>
          {edit ? 'Editar zona' : 'Crear zona'}
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
          
          <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
            <Row className="row-buttons-form">
              <Button type="primary" htmlType="submit">
                {edit ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button type="ghost" onClick={() => navigate("/zone", { replace: true })}>
                Cancelar
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};