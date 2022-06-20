import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Spin,
  Alert,
  InputNumber,
} from "antd";
import moment from "moment";
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import DatePicker from "antd/lib/date-picker";
import "../../sass/form.scss";
import { getCurrentUser } from "../../utils/common";
import { IPaymentFormPropsComponent } from "../../interfaces/payment";

export const PaymentForm = ({
  handleSubmit,
  dataRegister,
  getPriceRegisterByPlaca,
  loading,
  showError,
  setShowError,
}: IPaymentFormPropsComponent) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [search, setSearch] = useState(true);

  const searchByPlaca = async (placa: string) => {
    const tarifa: number | undefined = await getPriceRegisterByPlaca(placa);
    if (tarifa) {
      setSearch(false);
      form.setFieldsValue({
        price: tarifa
      });
    }
  };

  const onFinish = async (values: any) => {
    await searchByPlaca(values.placa);
  };

  const savePayment = () => {
    const values = form.getFieldsValue();
    const message = `El pago ha sido creado con éxito.`;
    const currentUser = getCurrentUser();
    handleSubmit({ ...values, autor: currentUser.id }, message, form);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    form.setFieldsValue({
      placa: '',
      price: ''
    });
    if (dataRegister) {
      searchByPlaca(dataRegister.placa);
      form.setFieldsValue({
        placa: dataRegister.placa
      });
    } else {
      setSearch(true);
    }
  }, [dataRegister]);

  useEffect(() => {
    form.setFieldsValue({
      datePayment: moment(new Date())
    });
  }, []);

  // const disabledDate: RangePickerProps['disabledDate'] = current => {
  //   // Can not select days before today and today
  //   return current && current < moment().endOf('day');
  // };

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>
          Gestión pagos
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
            label="Placa"
            name="placa"
            rules={[{ required: true, message: "Por favor ingrese la placa!" }]}
          >
            <Input onChange={() => {
              form.setFieldsValue({
                price: ''
              });
              setSearch(true);
            }} />
          </Form.Item>

          <Form.Item
            label="Valor mes"
            name="price"
          >
            <InputNumber disabled min={0} max={1000000} />
          </Form.Item>

          <Form.Item
            label="Fecha de pago"
            name="datePayment"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la fecha de pago!",
              },
            ]}
          >
            <DatePicker picker="date" disabled />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
            <Row className="row-buttons-form">
              {
                search && (
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    Buscar
                  </Button>
                )
              }
              {!search && (
                <Button
                  type="primary"
                  onClick={() => savePayment()}
                >
                  Pagar
                </Button>
              )}
              <Button
                type="ghost"
                onClick={() => navigate("/", { replace: true })}
              >
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
                message: "",
              });
            }
          }}
        />
      )}
    </>
  );
};
