import { Form, Input, Button, Row, Col, Select, Spin, Alert } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IListKeyMenu, IMenuFormPropsComponent } from "../../interfaces/menu";
import { IRole } from "../../interfaces/user";
import "../../sass/form.scss";

const { Option } = Select;

export const MenuForm = ({
  dataRole,
  handleSubmit,
  dataMenu,
  edit,
  loading,
  showError,
  setShowError,
  selectsData
}: IMenuFormPropsComponent) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const text = edit ? 'editado' : 'creado';
    const message = `El usuario ha sido ${text} con éxito.`;
    handleSubmit({ ...values, key: values.keyMenu }, message);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (edit && dataMenu) {
      form.setFieldsValue({
        ...dataMenu,
        keyMenu: dataMenu.key
      });
    }
  }, [edit, dataMenu]);

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>
          {edit ? 'Editar menú' : 'Crear menú'}
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
            rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Icono"
            name="icon"
            rules={[{ required: true, message: 'Por favor ingrese el icono!' }]}
          >
            <Select allowClear>
              {(selectsData?.listIcons || []).map((item: IListKeyMenu) => 
                <Option value={item.key}>{item.value}</Option>)
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="Llave menú"
            name="keyMenu"
            rules={[{ required: true, message: 'Por favor ingrese la llave del menú!' }]}
          >
            <Select allowClear disabled={edit}>
              {(selectsData?.listKeyMenu || []).map((item: IListKeyMenu) => 
                <Option value={item.key}>{item.value}</Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item
            label="Roles"
            name="roles"
            rules={[{ required: true, message: 'Por favor ingrese su Rol!' }]}
          >
            <Select
              mode="multiple"
              allowClear
            >
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
              <Button type="ghost" onClick={() => navigate("/menu", { replace: true })}>
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