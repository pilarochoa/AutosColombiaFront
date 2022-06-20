import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { Registers as RegistersComponent } from "../../components/Register/Registers";
import AppContext from "../../context/AppContext";
import { IRegister } from "../../interfaces/register";
import { RegisterService } from "../../services/register";

export const Registers = () => {
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<IRegister[]>([]);

  const getAllRegisters = async () => {
    try {
      const registers: IRegister[] | undefined = await RegisterService.getAllRegisters(setIsLogin);
      if (registers && registers.length > 0) {
        const resultData: IRegister[] = registers.map((item: IRegister) => {
          return { ...item, key: item._id }
        });
        setDataSource(resultData);
      }
      setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRegisters = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('register');
    };
    setLoading(true);
    getAllRegisters();
  }, []);

  const deleteRegister = async (id: string) => {
    setLoading(true);
    try {
      const user: IRegister | undefined = await RegisterService.deleteRegister(id, setIsLogin);
      setLoading(false);
      if (user) {
        const newData = dataSource.filter((item: IRegister) => item._id !== id);
        setDataSource(newData);
        message.success('El registro ha sido eliminado con éxito.', 2);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error deleteRegister = ",  error);
    }
  };

  return (
    <RegistersComponent
      dataSource={dataSource}
      loading={loading}
      handleDelete={deleteRegister}
    />
  );
};