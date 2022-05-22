import axios from "axios"
import { IRole } from "../interfaces/user";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

const token = getToken();

export class RoleService {

  static getAllUsers = async ()=> {
    try {
      let url = `${REACT_APP_API}/api/role`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
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