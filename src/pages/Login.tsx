import { useState } from "react";
import { Form, Input, Button, Row, Col, Alert } from "antd";
import { useParams } from "react-router-dom";
import "../sass/form.scss";
import { AuthService } from "../services/auth";
import { IAuth } from "../interfaces/auth";

interface ILogin {
  setIsLogin: Function;
}

export const Login = ({ setIsLogin }: ILogin) => {
  const [showError, setShowError] = useState(false);
  const { id } = useParams();

  console.log('id param = ', id);
  const onFinish = async (values: any) => {
    setShowError(false);
    try {
      const dataUserLogeed: IAuth = await AuthService.signIn(values.username, values.password);
      console.log('dataUserLogeed == ', dataUserLogeed);
      localStorage.setItem('token_access', dataUserLogeed.accessToken);
      localStorage.setItem('token_exp', dataUserLogeed.exp.toString());
      localStorage.setItem('currentUser', JSON.stringify({
        id: dataUserLogeed.id,
        name: dataUserLogeed.name,
        rol: dataUserLogeed.email
      }));
      setIsLogin(true);
    } catch (error) {
      console.log('Error onFinish = ', error);
      setShowError(true);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>Login</Col>
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
              Login
            </Button>
          </Row>
        </Form.Item>
        {showError && (
          <Alert message="Correo o contraseña invalida" type="warning" showIcon closable onClose={() => setShowError(false)} />
        )}
      </Form>
    </>
  );
};