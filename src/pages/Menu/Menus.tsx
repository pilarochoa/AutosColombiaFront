import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { Menus as MenusComponent } from "../../components/Menu/Menus";
import AppContext from "../../context/AppContext";
import { IMenu } from "../../interfaces/menu";
import { MenuService } from "../../services/menu";

export const Menus = () => {
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<IMenu[]>([]);
  
  const getAllMenus = async () => {
    try {
      const menus: IMenu[] | undefined = await MenuService.getAllMenus(setIsLogin);
      console.log('menus == ', menus);
      if (menus && menus.length > 0) {
        const resultData: IMenu[] = menus.map((item: IMenu) => {
          return { ...item, key: item._id, keyMenu: item.key }
        });
        setDataSource(resultData);
      }
      setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log("Error getAllMenus = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('menu');
    };
    setLoading(true);
    getAllMenus();
  }, []);

  const deleteMenu = async (id: string) => {
    setLoading(true);
    try {
      const user: IMenu | undefined = await MenuService.deleteMenu(id, setIsLogin);
      setLoading(false);
      if (user) {
        const newData = dataSource.filter((item: IMenu) => item._id !== id);
        setDataSource(newData);
        message.success('El registro ha sido eliminado con éxito.', 2);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error deleteMenu = ",  error);
    }
  };

  return (
    <MenusComponent
      dataSource={dataSource}
      loading={loading}
      handleDelete={deleteMenu}
    />
  );
};