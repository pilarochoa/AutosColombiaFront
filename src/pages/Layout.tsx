import { useContext, useState, useEffect } from 'react';
import { Avatar, Dropdown, Layout as LayoutAnt, Menu, MenuProps, Spin } from 'antd';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../sass/layout.scss';
import { IconComponent } from '../components/Common/IconComponent';

import logoReact from "../assets/logoReact.svg";
import AppContext from '../context/AppContext';
import { IMenu } from '../interfaces/menu';
import { MenuService } from '../services/menu';
import { getCurrentUser } from '../utils/common';

const { Header, Content, Sider } = LayoutAnt;

export const Layout = () => {
  const { defaultMenu, setIsLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [items2, setItems2] = useState<MenuProps['items'] | []>([]);
  const [loading, setLoading] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const getAllMenus = async () => {
    try {
      const menus: IMenu[] | undefined = await MenuService.getAllMenus(setIsLogin);
      let dataItems: any[] = [];
      if (menus && menus.length > 0) {
        const dataMenuFilter: any[] = [];
        const currentUser = getCurrentUser();
        (menus || []).forEach((item: IMenu) => {
          if (item.roles.some(rol => rol.name.toUpperCase() === currentUser.rol)) {
            dataMenuFilter.push(item);
          }
        });
        dataItems = (dataMenuFilter || []).map(
          (item: IMenu, index: number) => {
            return {
              key: item.key,
              icon: <IconComponent icon={item.icon} />,
              label: item.name,
              onClick: () => navigate(`/${item.key}`)
            };
          },
        );
      }
      dataItems.unshift({
        key: 'register',
        label: 'Registros',
        icon: <PlusSquareOutlined />,
        onClick: () => navigate("/register", { replace: true })
        // label: 'Registro',
        // children: [{
        //   key: 'register-form',
        //   label: 'Ingresar registro',
        //   onClick: () => navigate("/register/form", { replace: true })
        // }, {
        //   key: 'register',
        //   label: 'Consultar registro',
        //   onClick: () => navigate("/register", { replace: true })
        // }]
      });
      dataItems.unshift({
        key: 'home',
        icon: <HomeOutlined />,
        label: 'Inicio',
        onClick: () => navigate("/", { replace: true })
      });
      setItems2(dataItems);
      setLoading(false);
    } catch (error) {
      console.log('Error getAllMenus = ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllMenus();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  const MenuDrop = () => (
    <Menu
      onClick={handleLogout}
      items={[
        {
          label: 'Cerrar sesión',
          key: '1',
        }
      ]}
    />
  );

  return (
    <LayoutAnt>
      <Header className="header header-fixed">
        <div className="logo">
          <img src={logoReact} className="App-logo" alt="logo" />
        </div>
        <Dropdown
          overlay={() => <MenuDrop />}
          placement="bottomRight"
          className="content-user-dropdown"
        >
          <a
            href="javascrip:void()"
            className="custom-header-user"
            onClick={e => e.preventDefault()}
          >
            <Avatar icon={<UserOutlined />} />
            <span style={{ paddingLeft: 8 }}>{JSON.parse(localStorage.getItem('currentUser') || '')?.name || ""}</span>
          </a>
        </Dropdown>
      </Header>
      <LayoutAnt>
        <Sider
          width={200}
          className="site-layout-background sider-fixed"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <Spin spinning={loading} className={loading ? 'custom-spinning' : ''}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['home']}
              selectedKeys={[`${defaultMenu}`]}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              items={items2}
            />
          </Spin>
        </Sider>
        <LayoutAnt
          className="content-layout-section"
          style={{
            padding: '0 24px 24px',
            marginTop: '64px',
            marginLeft: '200px'
          }}
        >
          <Content
            className="content-section-principal"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </LayoutAnt>
      </LayoutAnt>
    </LayoutAnt>
  );
};