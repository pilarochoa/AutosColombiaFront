import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconComponent } from "../../components/Common/IconComponent";
import { MenuForm } from "../../components/Menu/MenuForm";
import AppContext from "../../context/AppContext";
import { IListKeyMenu, IMenu, ISelectsDataMenu } from "../../interfaces/menu";
import { IRole } from "../../interfaces/user";
import { MenuService } from "../../services/menu";
import { RoleService } from "../../services/role";

export const Menu = () => {
  const { id } = useParams();
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataRole, setDataRole] = useState<IRole[] | []>([]);
  const [dataMenu, setDataMenu] = useState<IMenu | undefined>(undefined);
  const [showError, setShowError] = useState({
    show: false,
    message: ""
  });
  const [selectsData, setSelectsData] = useState<ISelectsDataMenu>({
    listKeyMenu: [],
    listIcons: []
  });

  const navigate = useNavigate();

  const listIcons: IListKeyMenu[] = [{
    key: 'user',
    value: <>Usuarios <IconComponent icon="user" /></>
  }, {
    key: 'menu',
    value: <>Menu <IconComponent icon="menu" /></>
  }, {
    key: 'zone',
    value: <>Zona <IconComponent icon="zone" /></>
  }, {
    key: 'cell',
    value: <>Celda <IconComponent icon="cell" /></>
  }, {
    key: 'customer',
    value: <>Cliente <IconComponent icon="customer" /></>
  }, {
    key: 'vehicleType',
    value: <>Tipo de vehiculo <IconComponent icon="vehicleType" /></>
  }, {
    key: 'stateCell',
    value: <>Estado celda <IconComponent icon="stateCell" /></>
  }];

  const listKeyMenu: IListKeyMenu[] = [{
    key: 'users',
    value: 'users - Usuario'
  }, {
    key: 'menu',
    value: 'menu - Menú'
  }, {
    key: 'zone',
    value: 'zone - Zona'
  }, {
    key: 'cell',
    value: 'cell - Celda'
  }, {
    key: 'customer',
    value: 'customer - Cliente'
  }, {
    key: 'vehicleType',
    value: 'vehicleType - Tipo de vehiculo'
  }, {
    key: 'stateCell',
    value: 'stateCell - Estado celda'
  }];

  const getAllRoles = async () => {
    try {
      const roles: IRole[] | undefined = await RoleService.getAllRoles(setIsLogin);
      console.log('roles == ', roles);
      if (roles && roles.length > 0) {
        setDataRole(roles);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  const getMenuById = async (id: string) => {
    try {
      const user: IMenu | undefined = await MenuService.getMenuById(id, setIsLogin);
      console.log('user == ', user);
      if (user) {
        setDataMenu(user);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('menu');
    };
    setLoading(true);
    setSelectsData({
      listKeyMenu,
      listIcons
    });
    getAllRoles();
  }, []);

  useEffect(() => {
    if (id) {
      getMenuById(id);
    }
  }, [id]);
  

  const saveUpdateMenu = async (data: IMenu, text: string) => {
    setLoading(true);
    setShowError({
      show: false,
      message: ""
    });
    try {
      const user: IMenu | undefined = await
        (id ? MenuService.updateMenu(id, data, setShowError, setIsLogin) :
        MenuService.saveMenu(data, setShowError, setIsLogin));
      setLoading(false);
      if (user) {
        message.success(text, 2);
        navigate("/menu", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error saveUpdateMenu = ",  error);
    }
  };

  return (
    <MenuForm
      dataRole={dataRole}
      handleSubmit={saveUpdateMenu}
      loading={loading}
      dataMenu={dataMenu}
      edit={id ? true : false}
      showError={showError}
      setShowError={setShowError}
      selectsData={selectsData}
    />
  );
};