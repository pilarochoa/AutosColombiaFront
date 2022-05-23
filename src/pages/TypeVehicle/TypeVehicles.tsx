import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { TypeVehicles as TypeVehiclesComponent } from "../../components/TypeVehicle/TypeVehicles";
import AppContext from "../../context/AppContext";
import { ITypeVehicle } from "../../interfaces/typeVehicle";
import { TypeVehicleService } from "../../services/typeVehicle";

export const TypeVehicles = () => {
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<ITypeVehicle[]>([]);
  const getAllTypeVehicles = async () => {
    try {
      const typeVehicles: ITypeVehicle[] | undefined = await TypeVehicleService.getAllTypeVehicles(setIsLogin);
      console.log('typeVehicles == ', typeVehicles);
      if (typeVehicles && typeVehicles.length > 0) {
        const resultData: ITypeVehicle[] = typeVehicles.map((item: ITypeVehicle) => {
          return { ...item, key: item._id }
        });
        setDataSource(resultData);
      }
      setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log("Error getAllTypeVehicles = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('vehicleType');
    };
    setLoading(true);
    getAllTypeVehicles();
  }, []);

  const deleteTypeVehicle = async (id: string) => {
    setLoading(true);
    try {
      const user: ITypeVehicle | undefined = await TypeVehicleService.deleteTypeVehicle(id, setIsLogin);
      setLoading(false);
      if (user) {
        const newData = dataSource.filter((item: ITypeVehicle) => item._id !== id);
        setDataSource(newData);
        message.success('El registro ha sido eliminado con éxito.', 2);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error deleteTypeVehicle = ",  error);
    }
  };

  return (
    <TypeVehiclesComponent
      dataSource={dataSource}
      loading={loading}
      handleDelete={deleteTypeVehicle}
    />
  );
};