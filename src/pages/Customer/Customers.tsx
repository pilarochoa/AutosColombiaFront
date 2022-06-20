import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { Customers as CustomersComponent } from "../../components/Customer/Customers";
import AppContext from "../../context/AppContext";
import { ICustomer } from "../../interfaces/customer";
import { CustomerService } from "../../services/customer";

export const Customers = () => {
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<ICustomer[]>([]);

  const getAllCustomers = async () => {
    try {
      const customers: ICustomer[] | undefined = await CustomerService.getAllCustomers(setIsLogin);
      if (customers && customers.length > 0) {
        const resultData: ICustomer[] = customers.map((item: ICustomer) => {
          return { ...item, key: item._id }
        });
        setDataSource(resultData);
      }
      setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log("Error getAllCustomers = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('customer');
    };
    setLoading(true);
    getAllCustomers();
  }, []);

  const deleteCustomer = async (id: string) => {
    setLoading(true);
    try {
      const user: ICustomer | undefined = await CustomerService.deleteCustomer(id, setIsLogin);
      setLoading(false);
      if (user) {
        const newData = dataSource.filter((item: ICustomer) => item._id !== id);
        setDataSource(newData);
        message.success('El cliente ha sido eliminado con éxito.', 2);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error deleteCustomer = ",  error);
    }
  };

  return (
    <CustomersComponent
      dataSource={dataSource}
      loading={loading}
      handleDelete={deleteCustomer}
    />
  );
};