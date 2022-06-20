import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TypeVehicleForm } from "../../components/TypeVehicle/TypeVehicleForm";
import AppContext from "../../context/AppContext";
import { ITypeVehicle } from "../../interfaces/typeVehicle";
import { TypeVehicleService } from "../../services/typeVehicle";

export const TypeVehicle = () => {
  const { id } = useParams();
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataTypeVehicle, setDataTypeVehicle] = useState<ITypeVehicle | undefined>(undefined);

  const navigate = useNavigate();

  const getTypeVehicleById = async (id: string) => {
    try {
      const typeVehicle: ITypeVehicle | undefined = await TypeVehicleService.getTypeVehicleById(id, setIsLogin);
      if (typeVehicle) {
        setDataTypeVehicle(typeVehicle);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getTypeVehicleById = ",  error);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (setDefaultMenu) {
      setDefaultMenu('vehicleType');
    };
    setLoading(false);
  }, []);

  useEffect(() => {
    if (id) {
      getTypeVehicleById(id);
    }
  }, [id]);
  

  const saveUpdateTypeVehicle = async (data: ITypeVehicle, text: string) => {
    setLoading(true);
    try {
      const typeVehicle: ITypeVehicle | undefined = await
        (id ? TypeVehicleService.updateTypeVehicle(id, data, setIsLogin) : TypeVehicleService.saveTypeVehicle(data, setIsLogin));
      setLoading(false);
      if (typeVehicle) {
        message.success(text, 2);
        navigate("/vehicleType", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error saveUpdateTypeVehicle = ",  error);
    }
  };

  return (
    <TypeVehicleForm
      handleSubmit={saveUpdateTypeVehicle}
      loading={loading}
      dataTypeVehicle={dataTypeVehicle}
      edit={id ? true : false}
    />
  );
};