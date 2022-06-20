import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { ICell } from "../../interfaces/cell";
import { ICustomer } from "../../interfaces/customer";
import { IDataSelectRegister, IRegister } from "../../interfaces/register";
import { ITypeVehicle } from "../../interfaces/typeVehicle";
import { CellService } from "../../services/cell";
import { CustomerService } from "../../services/customer";
import { RegisterService } from "../../services/register";
import { TypeVehicleService } from "../../services/typeVehicle";
import { PaymentForm } from "../../components/Payment/PaymentForm";
import { IPayment } from "../../interfaces/payment";
import { PaymentService } from "../../services/payment";

export const Payment = () => {
  const { id } = useParams();
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataSelects, setDataSelects] = useState<IDataSelectRegister>({
    dataTypeVehicles: [],
    dataCells: [],
    dataCustomers: []
  });
  const [dataRegister, setDataRegister] = useState<IRegister | undefined>(undefined);
  const [showError, setShowError] = useState({
    show: false,
    message: ""
  });

  const navigate = useNavigate();

  const getRegisterById = async (id: string) => {
    try {
      const register: IRegister | undefined = await RegisterService.getRegisterById(id, setIsLogin);
      if (register) {
        setDataRegister(register);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  const getPriceRegisterByPlaca = async (placa: string) => {
    setLoading(true);
    try {
      const tarifa: number | undefined = await RegisterService.getPriceRegisterByPlaca(placa, setIsLogin);
      if (tarifa) {
        setLoading(false);
        return tarifa;
      }
      setLoading(false);
      return undefined;
    } catch (error) {
      setLoading(false);
      console.log("Error getPriceRegisterByPlaca = ",  error);
    }
  }

  const getAllLists = async () => {
    try {
      const typeVehicles: ITypeVehicle[] | undefined = await TypeVehicleService.getAllTypeVehicles(setIsLogin);
      const cells: ICell[] | undefined = await CellService.getAllCells(setIsLogin, (id ? undefined : '/api/cell/available'));
      const customers: ICustomer[] | undefined = await CustomerService.getAllCustomers(setIsLogin);
      setDataSelects({
        ...dataSelects,
        dataTypeVehicles: typeVehicles || [],
        dataCells: cells || [],
        dataCustomers: customers || []
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllLists = ",  error);
    }
  };

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('payment');
    };
    setLoading(true);
    getAllLists();
  }, []);

  useEffect(() => {
    if (id) {
      getRegisterById(id);
    } else {
      setDataRegister(undefined);
    }
  }, [id]);
  

  const saveUpdatePayment = async (data: IPayment, text: string, form: any) => {
    setLoading(true);
    try {
      /* const payment: IPayment | undefined = await
        (id ? PaymentService.updatePayment(id, data, setIsLogin) : PaymentService.savePayment(data, setIsLogin)); */
      const payment: IPayment | undefined = await PaymentService.savePayment(data, setIsLogin);
      setLoading(false);
      if (payment) {
        form.setFieldsValue({
          placa: '',
          price: ''
        });
        message.success(text, 2);
        navigate("/payment", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error saveUpdatePayment = ",  error);
    }
  };

  return (
    <PaymentForm
      handleSubmit={saveUpdatePayment}
      dataRegister={dataRegister}
      getPriceRegisterByPlaca={getPriceRegisterByPlaca}
      loading={loading}
      showError={showError} 
      setShowError={setShowError}
    />
  );
};