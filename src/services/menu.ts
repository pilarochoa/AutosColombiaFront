import axios from "axios"
import { IMenu } from "../interfaces/menu";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class MenuService {

  static getAllMenus = async (setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/menu`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IMenu[] = [];
      (data || []).forEach((item: IMenu) => {
        delete item.__v;
        result.push(item);
      });
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static getMenuById = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/menu/${id}`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IMenu = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static saveMenu = async (dataMenu: IMenu, setShowError: Function, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/menu`;
      
      const { data } = await axios.post(url, dataMenu, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IMenu = data;
      return result;
    } catch (error: any) {
      console.log("error == ", error);
      if (error?.response?.data) {
        setShowError({
          show: true,
          message: error?.response?.data.message
        });
      }
    }
  }

  static updateMenu = async (id: string, dataMenu: IMenu, setShowError: Function, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/menu/${id}`;
      
      const { data } = await axios.put(url, dataMenu, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IMenu = data;
      return result;
    } catch (error: any) {
      console.log("error == ", error);
      if (error?.response?.data) {
        setShowError({
          show: true,
          message: error?.response?.data.message
        });
      }
    }
  }

  static deleteMenu = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/menu/${id}`;
      
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IMenu = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
  
}