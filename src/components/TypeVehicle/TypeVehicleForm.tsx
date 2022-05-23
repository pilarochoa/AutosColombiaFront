import { Form, Input, Button, Row, Col, Spin, InputNumber } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ITypeVehicleFormPropsComponent } from "../../interfaces/typeVehicle";
import "../../sass/form.scss";

export const TypeVehicleForm = ({
  handleSubmit,
  dataTypeVehicle,
  edit,
  loading
}: ITypeVehicleFormPropsComponent) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const text = edit ? 'editado' : 'creado';
    const message = `El tipo de vehículo ha sido ${text} con éxito.`;
    handleSubmit({ ...values }, message);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (edit && dataTypeVehicle) {
      form.setFieldsValue({
        ...dataTypeVehicle
      });
    }
  }, [edit, dataTypeVehicle]);

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>
          {edit ? 'Editar tipo vehículo' : 'Crear tipo vehículo'}
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
            label="Valor mes"
            name="tafifaMes"
            rules={[{ required: true, message: 'Por favor ingrese el valor del mes!' }]}
          >
            <InputNumber
              min={0}
              max={1000000}
            />
          </Form.Item>

          <Form.Item
            label="Valor día"
            name="tafifaDia"
            rules={[{ required: true, message: 'Por favor ingrese el valor del día!' }]}
          >
            <InputNumber
              min={0}
              max={1000000}
            />
          </Form.Item>
          
          <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
            <Row className="row-buttons-form">
              <Button type="primary" htmlType="submit">
                {edit ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button type="ghost" onClick={() => navigate("/vehicleType", { replace: true })}>
                Cancelar
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
};