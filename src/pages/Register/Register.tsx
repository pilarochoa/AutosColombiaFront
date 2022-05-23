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
import { RegisterForm } from "../../components/Register/RegisterForm";

export const Register = () => {
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
      const user: IRegister | undefined = await RegisterService.getRegisterById(id, setIsLogin);
      console.log('user == ', user);
      if (user) {
        setDataRegister(user);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  const getAllLists = async () => {
    try {
      const typeVehicles: ITypeVehicle[] | undefined = await TypeVehicleService.getAllTypeVehicles(setIsLogin);
      const cells: ICell[] | undefined = await CellService.getAllCells(setIsLogin, (id ? undefined : '/api/cell/available'));
      const customers: ICustomer[] | undefined = await CustomerService.getAllCustomers(setIsLogin);
      console.log('cells == ', cells);
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
      setDefaultMenu('users');
    };
    setLoading(true);
    getAllLists();
  }, []);

  useEffect(() => {
    if (id) {
      getRegisterById(id);
    }
  }, [id]);
  

  const saveUpdateRegister = async (data: IRegister, text: string) => {
    setLoading(true);
    try {
      const user: IRegister | undefined = await
        (id ? RegisterService.updateRegister(id, data, setIsLogin) : RegisterService.saveRegister(data, setIsLogin));
      setLoading(false);
      if (user) {
        message.success(text, 2);
        navigate("/register/form", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error saveUpdateRegister = ",  error);
    }
  };

  return (
    <RegisterForm
      dataSelects={dataSelects}
      handleSubmit={saveUpdateRegister}
      dataRegister={dataRegister}
      edit={id ? true : false}
      loading={loading}
      showError={showError} 
      setShowError={setShowError}
    />
  );
};