import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes as RoutesRender,
} from "react-router-dom";
import {
  Layout,
  HomePage,
  Users,
  User,
  Login,
  Menus,
  Menu,
  Zones,
  Zone,
  CellStatuses,
  CellStatus,
  Cells,
  Cell,
  Customers,
  Customer,
  TypeVehicles,
  TypeVehicle,
  Register,
  Registers
} from "../pages";
import AppContext from "../context/AppContext";
import { verifyToken } from "../utils/auth";

export const Routes = () => {
  const [defaultMenu, setDefaultMenu] = useState('home');
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token_access')) {
      if (verifyToken(Number(localStorage.getItem('token_exp')))) {
        setIsLogin(true);
      } else {
        localStorage.clear();
        setIsLogin(false);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider value={{ setIsLogin, defaultMenu, setDefaultMenu }}>
      {!loading && (
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
                <Route path="menu">
                  <Route index element={<Menus />} />
                  <Route path="form" element={<Menu />} />
                  <Route path="form/:id" element={<Menu />} />
                </Route>
                <Route path="zone">
                  <Route index element={<Zones />} />
                  <Route path="form" element={<Zone />} />
                  <Route path="form/:id" element={<Zone />} />
                </Route>
                <Route path="cell">
                  <Route index element={<Cells />} />
                  <Route path="form" element={<Cell />} />
                  <Route path="form/:id" element={<Cell />} />
                </Route>
                <Route path="customer">
                  <Route index element={<Customers />} />
                  <Route path="form" element={<Customer />} />
                  <Route path="form/:id" element={<Customer />} />
                </Route>
                <Route path="vehicleType">
                  <Route index element={<TypeVehicles />} />
                  <Route path="form" element={<TypeVehicle />} />
                  <Route path="form/:id" element={<TypeVehicle />} />
                </Route>
                <Route path="stateCell">
                  <Route index element={<CellStatuses />} />
                  <Route path="form" element={<CellStatus />} />
                  <Route path="form/:id" element={<CellStatus />} />
                </Route>
                <Route path="register">
                  <Route index element={<Registers />} />
                  <Route path="form" element={<Register />} />
                  <Route path="form/:id" element={<Register />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </RoutesRender>
          )}

        </Router>
      )}
    </AppContext.Provider>
  );
};
