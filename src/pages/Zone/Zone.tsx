import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZoneForm } from "../../components/Zone/ZoneForm";
import AppContext from "../../context/AppContext";
import { IZone } from "../../interfaces/zone";
import { ZoneService } from "../../services/zone";

export const Zone = () => {
  const { id } = useParams();
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataZone, setDataZone] = useState<IZone | undefined>(undefined);

  const navigate = useNavigate();

  const getZoneById = async (id: string) => {
    try {
      const user: IZone | undefined = await ZoneService.getZoneById(id, setIsLogin);
      console.log('user == ', user);
      if (user) {
        setDataZone(user);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (setDefaultMenu) {
      setDefaultMenu('zone');
    };
    setLoading(false);
  }, []);

  useEffect(() => {
    if (id) {
      getZoneById(id);
    }
  }, [id]);
  

  const saveUpdateZone = async (data: IZone, text: string) => {
    setLoading(true);
    try {
      const user: IZone | undefined = await
        (id ? ZoneService.updateZone(id, data, setIsLogin) : ZoneService.saveZone(data, setIsLogin));
      setLoading(false);
      if (user) {
        message.success(text, 2);
        navigate("/zone", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error saveUpdateZone = ",  error);
    }
  };

  return (
    <ZoneForm
      handleSubmit={saveUpdateZone}
      loading={loading}
      dataZone={dataZone}
      edit={id ? true : false}
    />
  );
};