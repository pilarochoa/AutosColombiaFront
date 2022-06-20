import axios from "axios"
import { IUser } from "../interfaces/user";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class UserService {

  static getAllUsers = async (setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/users`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IUser[] = [];
      (data || []).forEach((item: IUser) => {
        delete item.__v;
        result.push(item);
      });
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static getUserById = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/users/${id}`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IUser = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static saveUser = async (dataUser: IUser, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/users`;
      
      const { data } = await axios.post(url, dataUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IUser = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static updateUser = async (id: string, dataUser: IUser, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/users/${id}`;
      
      const { data } = await axios.put(url, dataUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IUser = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static deleteUser = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/users/${id}`;
      
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IUser = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
  
}