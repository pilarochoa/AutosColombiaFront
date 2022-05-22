import { useState } from 'react';
import { Layout as LayoutAnt, Menu, MenuProps } from 'antd';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  LaptopOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import '../sass/layout.scss';

import logoReact from "../assets/logoReact.svg";

const { Header, Content, Footer, Sider } = LayoutAnt;

export const Layout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  // const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  //   key,
  //   label: `nav ${key}`,
  // }));

  /* const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);

      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,

        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: `option${subKey}`,
          };
        }),
      };
    },
  ); */

  const items2: MenuProps['items'] = [{
    key: 'user',
    icon: <UserOutlined />,
    label: 'Usuarios',
    onClick: () => navigate("/users")
  }, {
    key: 'menu',
    icon: <MenuUnfoldOutlined />,
    label: 'Menus',
    onClick: () => navigate("/menus")
  }]

  return (
    <LayoutAnt>
      <Header className="header header-fixed">
        <div className="logo">
          <img src={logoReact} className="App-logo" alt="logo" />
        </div>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={[]} />
      </Header>
      <LayoutAnt>
        <Sider
          width={200}
          className="site-layout-background sider-fixed"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
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