import { Form, Input, Button, Row, Col, Select, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICustomerFormPropsComponent } from "../../interfaces/customer";
import "../../sass/form.scss";

const { Option } = Select;

export const CustomerForm = ({
  handleSubmit,
  dataCustomer,
  edit,
  loading
}: ICustomerFormPropsComponent) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const text = edit ? 'editado' : 'creado';
    const message = `El cliente ha sido ${text} con éxito.`;
    handleSubmit({ ...values }, message);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (edit && dataCustomer) {
      form.setFieldsValue({
        ...dataCustomer
      });
    }
  }, [edit, dataCustomer]);

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>
          {edit ? 'Editar cliente' : 'Crear cliente'}
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
            label="Tipo Documento"
            name="typeDocument"
            rules={[{ required: true, message: 'Por favor ingrese su tipo de documento!' }]}
          >
            <Select allowClear>
              <Option value="CC">Cédula</Option>
              <Option value="TI">Tarjeta Identidad</Option>
              <Option value="PAS">Pasaporte</Option>
              <Option value="TE">Tarjeta Extranjeria</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Documento"
            name="document"
            rules={[{ required: true, message: 'Por favor ingrese su documento!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Teléfono"
            name="phone"
            rules={[{ required: true, message: 'Por favor ingrese su teléfono!' }]}
          >
            <Input
              minLength={7}
              maxLength={10}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Por favor ingrese su email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
            <Row className="row-buttons-form">
              <Button type="primary" htmlType="submit">
                {edit ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button type="ghost" onClick={() => navigate("/customer", { replace: true })}>
                Cancelar
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};