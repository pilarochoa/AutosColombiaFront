import { Form, Input, Button, Row, Col, Select, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IRole, IUserFormPropsComponent } from "../../interfaces/user";
import "../../sass/form.scss";

const { Option } = Select;

export const UserForm = ({
  dataRole,
  handleSubmit,
  dataUser,
  edit,
  loading
}: IUserFormPropsComponent) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const text = edit ? 'editado' : 'creado';
    const message = `El usuario ha sido ${text} con éxito.`;
    handleSubmit({ ...values }, message);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (edit && dataUser) {
      form.setFieldsValue({
        ...dataUser
      });
    }
  }, [edit, dataUser]);

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>
          {edit ? 'Editar usuario' : 'Crear usuario'}
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

          {!edit && (
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item
            label="Rol"
            name="rol"
            rules={[{ required: true, message: 'Por favor ingrese su Rol!' }]}
          >
            <Select allowClear>
              {dataRole.map((role: IRole, index: number) =>
                <Option
                  key={`option-key-${index}`}
                  value={role._id}
                >
                  {role.name}
                </Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
            <Row className="row-buttons-form">
              <Button type="primary" htmlType="submit">
                {edit ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button type="ghost" onClick={() => navigate("/users", { replace: true })}>
                Cancelar
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};