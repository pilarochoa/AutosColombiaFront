import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes as RoutesRender,
} from "react-router-dom";
import { Layout, HomePage, Users, User, Login } from "../pages";
import { verifyToken } from "../utils/auth";

const Prueba = ({ title }: any) => {
  return (
    <div>Prueba {title}</div>
  );
}

export const Routes = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token_access')) {
      if (verifyToken(Number(localStorage.getItem('token_exp')))) {
        setIsLogin(true); 
      } else {
        setIsLogin(false);
      }
    }
  }, []);

  return (
    <Router>
      {!isLogin ? (
        <RoutesRender>
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </RoutesRender>
      ) : (
        <RoutesRender>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="users">
              <Route index element={<Users />} />
              <Route path="form" element={<User />} />
              <Route path="form/:id" element={<User />} />
            </Route>
            <Route path="menu" element={<Prueba title="Menus" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </RoutesRender>
      )}

    </Router>
  );
};
