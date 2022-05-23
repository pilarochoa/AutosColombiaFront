import { useEffect } from "react";
import { Form, Input, Button, Row, Col, Select, Spin, Alert } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { IRegisterFormPropsComponent } from "../../interfaces/register";
import { ITypeVehicle } from "../../interfaces/typeVehicle";
import { ICell } from "../../interfaces/cell";
import { ICustomer } from "../../interfaces/customer";
import DatePicker, { RangePickerProps } from "antd/lib/date-picker";
import "../../sass/form.scss";
import { getCurrentUser } from "../../utils/common";

const { Option } = Select;

export const RegisterForm = ({
  dataSelects,
  handleSubmit,
  dataRegister,
  edit,
  loading,
  showError,
  setShowError
}: IRegisterFormPropsComponent) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const text = edit ? 'editada' : 'creada';
    const message = `La celda ha sido ${text} con éxito.`;
    const currentUser = getCurrentUser();
    handleSubmit({ ...values, userEnter: currentUser.id }, message);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (edit && dataRegister) {
      form.setFieldsValue({
        ...dataRegister,
        dateInicio: moment(dataRegister.dateInicio),
        dateEnd: moment(dataRegister.dateEnd)
      });
    }
  }, [edit, dataRegister]);

  // const disabledDate: RangePickerProps['disabledDate'] = current => {
  //   // Can not select days before today and today
  //   return current && current < moment().endOf('day');
  // };

  return (
    <>
      <Row className="title-form-row">
        <Col span={14} offset={2}>
          {edit ? 'Editar registro' : 'Crear registro'}
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
            rules={[{ required: true, message: 'Por favor ingrese la placa!' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Tipo Vehículo"
            name="typeVehicle"
            rules={[{ required: true, message: 'Por favor ingrese el tipo de vehículo!' }]}
          >
            <Select allowClear>
              {dataSelects.dataTypeVehicles.map((typeVehicle: ITypeVehicle, index: number) =>
                <Option
                  key={`option-key-${index}`}
                  value={typeVehicle._id}
                >
                  {typeVehicle.name}
                </Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Celda"
            name="cell"
            rules={[{ required: true, message: 'Por favor ingrese la celda!' }]}
          >
            <Select allowClear disabled={edit}>
              {dataSelects.dataCells.map((cell: ICell, index: number) =>
                <Option
                  key={`option-key-${index}`}
                  value={cell._id}
                >
                  {cell.name}
                </Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Cliente"
            name="customer"
            rules={[{ required: true, message: 'Por favor ingrese el cliente!' }]}
          >
            <Select allowClear>
              {dataSelects.dataCustomers.map((customer: ICustomer, index: number) =>
                <Option
                  key={`option-key-${index}`}
                  value={customer._id}
                >
                  {customer.name}
                </Option>
              )}
            </Select>
          </Form.Item>

          <Form.Item
            label="Fecha Inicio"
            name="dateInicio"
            rules={[{ required: true, message: 'Por favor ingrese la fecha inicio!' }]}
          >
            <DatePicker picker="date" />
          </Form.Item>

          <Form.Item
            label="Fecha Final"
            name="dateEnd"
            rules={[{ required: true, message: 'Por favor ingrese la fecha fin!' }]}
          >
            <DatePicker picker="date" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 10 }}>
            <Row className="row-buttons-form">
              <Button type="primary" htmlType="submit">
                {edit ? 'Actualizar' : 'Guardar'}
              </Button>
              <Button type="ghost" onClick={() => navigate("/register", { replace: true })}>
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