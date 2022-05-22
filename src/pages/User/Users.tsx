import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { Users as UsersComponent } from "../../components/User/Users";
import AppContext from "../../context/AppContext";
import { IUser } from "../../interfaces/user";
import { UserService } from "../../services/user";

export const Users = () => {
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<IUser[]>([]);
  const navigator = useNavigate();

  const getAllUsers = async () => {
    try {
      const users: IUser[] | undefined = await UserService.getAllUsers(setIsLogin);
      console.log('users == ', users);
      if (users && users.length > 0) {
        const resultData: IUser[] = users.map((item: IUser) => {
          return { ...item, key: item._id }
        });
        setDataSource(resultData);
      }
      setLoading(false); 
    } catch (error) {
      setLoading(false);
      console.log("Error getAllUsers = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('users');
    };
    setLoading(true);
    getAllUsers();
  }, []);

  const deleteUser = async (id: string) => {
    setLoading(true);
    try {
      const user: IUser | undefined = await UserService.deleteUser(id, setIsLogin);
      setLoading(false);
      if (user) {
        const newData = dataSource.filter((item: IUser) => item._id !== id);
        setDataSource(newData);
        message.success('El usuario ha sido eliminado con éxito.', 2);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error saveUpdateUser = ",  error);
    }
  };

  return (
    <UsersComponent
      dataSource={dataSource}
      loading={loading}
      handleDelete={deleteUser}
    />
  );
};