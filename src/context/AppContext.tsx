import { createContext } from "react";
import { IAppContextProps } from "../interfaces/appContext";

const AppContext = createContext<IAppContextProps>({
  setIsLogin: () => {}
});

export default AppContext;