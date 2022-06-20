import { message } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserForm } from "../../components/User/UserForm";
import AppContext from "../../context/AppContext";
import { IRole, IUser } from "../../interfaces/user";
import { RoleService } from "../../services/role";
import { UserService } from "../../services/user";

export const User = () => {
  const { id } = useParams();
  const { setIsLogin, setDefaultMenu } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataRole, setDataRole] = useState<IRole[] | []>([]);
  const [dataUser, setDataUser] = useState<IUser | undefined>(undefined);

  const navigate = useNavigate();

  const getAllRoles = async () => {
    try {
      const roles: IRole[] | undefined = await RoleService.getAllRoles(setIsLogin);
      if (roles && roles.length > 0) {
        setDataRole(roles);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  const getUserById = async (id: string) => {
    try {
      const user: IUser | undefined = await UserService.getUserById(id, setIsLogin);
      if (user) {
        setDataUser(user);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error getAllRoles = ",  error);
    }
  }

  useEffect(() => {
    if (setDefaultMenu) {
      setDefaultMenu('users');
    };
    setLoading(true);
    getAllRoles();
  }, []);

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);
  

  const saveUpdateUser = async (data: IUser, text: string) => {
    setLoading(true);
    try {
      const user: IUser | undefined = await
        (id ? UserService.updateUser(id, data, setIsLogin) : UserService.saveUser(data, setIsLogin));
      setLoading(false);
      if (user) {
        message.success(text, 2);
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
        const idUser = id ? id : data._id;
        if (currentUser && currentUser.id === idUser) {
          localStorage.setItem('currentUser', JSON.stringify({
            ...currentUser,
            name: data.name
          }));
        }
        navigate("/users", { replace: true });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error saveUpdateUser = ",  error);
    }
  };

  return (
    <UserForm
      dataRole={dataRole}
      handleSubmit={saveUpdateUser}
      loading={loading}
      dataUser={dataUser}
      edit={id ? true : false}
    />
  );
};