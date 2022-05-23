import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerForm } from "../../components/Customer/CustomerForm";
import AppContext from "../../context/AppContext";
import { ICustomer } from "../../interfaces/customer";
import { CustomerService } from "../../services/customer";

export const Customer = () => {
  const { id } = useParams();
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataCustomer, setDataCustomer] = useState<ICustomer | undefined>(undefined);

  const navigate = useNavigate();

  const getCustomerById = async (id: string) => {
    try {
      const customer: ICustomer | undefined = await CustomerService.getCustomerById(id, setIsLogin);
      console.log('customer == ', customer);
      if (customer) {
        setDataCustomer(customer);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('customer');
    };
  }, []);

  useEffect(() => {
    if (id) {
      getCustomerById(id);
    }
  }, [id]);
  

  const saveUpdateCustomer = async (data: ICustomer, text: string) => {
    setLoading(true);
    try {
      const customer: ICustomer | undefined = await
        (id ? CustomerService.updateCustomer(id, data, setIsLogin) :
        CustomerService.saveCustomer(data, setIsLogin));
      debugger;  
      if (customer) {
        message.success(text, 2);
        navigate("/customer", { replace: true });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error saveUpdateCustomer = ",  error);
    }
  };

  return (
    <CustomerForm
      handleSubmit={saveUpdateCustomer}
      loading={loading}
      dataCustomer={dataCustomer}
      edit={id ? true : false}
    />
  );
};