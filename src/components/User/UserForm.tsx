import { Form, Input, Button, Row, Col } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import "../../sass/form.scss";

export const UserForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  console.log('id param = ', id);
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>Crear usuario</Col>
      </Row>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
          <Row className="row-buttons-form">
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
            <Button type="ghost" onClick={() => navigate("/users", { replace: true })}>
              Cancelar
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};