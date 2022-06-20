import {
  HomeOutlined,
  UserOutlined,
  BorderHorizontalOutlined,
  BorderOuterOutlined,
  UsergroupDeleteOutlined,
  PicLeftOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  DollarOutlined
} from '@ant-design/icons';

interface IPropIconComponent {
  icon: string;
}

export const IconComponent = ({ icon }: IPropIconComponent) => {
  let iconResponse = <></>;
  switch (icon) {
    case 'home':
      iconResponse = <HomeOutlined />;
      break;
    case 'user':
      iconResponse = <UserOutlined />;
        break;
    case 'menu':
      iconResponse = <MenuUnfoldOutlined />;
      break;
    case 'zone':
      iconResponse = <BorderHorizontalOutlined />;
      break;
    case 'cell':
      iconResponse = <BorderOuterOutlined />;
        break;
    case 'customer':
      iconResponse = <UsergroupDeleteOutlined />;
        break;
    case 'vehicleType':
      iconResponse = <PicLeftOutlined />;
        break;
    case 'stateCell':
      iconResponse = <AppstoreOutlined />;
        break;
    case 'payment':
      iconResponse = <DollarOutlined />;
        break;
    default:
      break;
  }
  return iconResponse;
}
