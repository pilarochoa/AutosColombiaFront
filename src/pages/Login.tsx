import { useState } from "react";
import { Form, Input, Button, Row, Col, Alert } from "antd";
import { useParams } from "react-router-dom";
import "../sass/form.scss";
import { AuthService } from "../services/auth";
import { IAuth } from "../interfaces/auth";
import "../sass/login.scss";

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
      const dataUserLogeed: IAuth = await AuthService.signIn(values.email, values.password);
      console.log('dataUserLogeed == ', dataUserLogeed);
      localStorage.setItem('token_access', dataUserLogeed.accessToken);
      localStorage.setItem('token_exp', dataUserLogeed.exp.toString());
      localStorage.setItem('currentUser', JSON.stringify({
        id: dataUserLogeed.id,
        name: dataUserLogeed.name,
        rol: dataUserLogeed.rol
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
    <div className="content-login">
      <div className="section-login">
        <Row className="title-form-row">
          <Col span={14} offset={2}>Parking Login</Col>
        </Row>
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 10 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[{ required: true, message: 'Por favor ingrese su email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Por favor ingres su contraseña!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
            <Row className="row-buttons-form">
              <Button type="primary" htmlType="submit">
                Iniciar sesión
              </Button>
            </Row>
          </Form.Item>
          {showError && (
            <Alert message="Correo o contraseña invalida" type="warning" showIcon closable onClose={() => setShowError(false)} />
          )}
        </Form>
      </div>
    </div>
  );
};