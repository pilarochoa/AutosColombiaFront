import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { Zones as ZonesComponent } from "../../components/Zone/Zones";
import AppContext from "../../context/AppContext";
import { IZone } from "../../interfaces/zone";
import { ZoneService } from "../../services/zone";

export const Zones = () => {
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<IZone[]>([]);
  
  const getAllZones = async () => {
    try {
      const zones: IZone[] | undefined = await ZoneService.getAllZones(setIsLogin);
      console.log('zones == ', zones);
      if (zones && zones.length > 0) {
        const resultData: IZone[] = zones.map((item: IZone) => {
          return { ...item, key: item._id }
        });
        setDataSource(resultData);
      }
      setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log("Error getAllZones = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('zone');
    };
    setLoading(true);
    getAllZones();
  }, []);

  const deleteZone = async (id: string) => {
    setLoading(true);
    try {
      const user: IZone | undefined = await ZoneService.deleteZone(id, setIsLogin);
      setLoading(false);
      if (user) {
        const newData = dataSource.filter((item: IZone) => item._id !== id);
        setDataSource(newData);
        message.success('El registro ha sido eliminado con éxito.', 2);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error deleteZone = ",  error);
    }
  };

  return (
    <ZonesComponent
      dataSource={dataSource}
      loading={loading}
      handleDelete={deleteZone}
    />
  );
};