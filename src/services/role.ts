import axios from "axios"
import { IRole } from "../interfaces/user";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class RoleService {

  static getAllRoles = async (setIsLogin: Function)=> {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/role`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IRole[] = [];
      (data || []).forEach((item: IRole) => {
        delete item.__v;
        result.push(item);
      });
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
}