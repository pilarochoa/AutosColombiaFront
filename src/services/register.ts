import axios from "axios"
import { IRegister } from "../interfaces/register";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class RegisterService {

  static getAllRegisters = async (setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/register`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: IRegister[] = [];
      (data || []).forEach((item: IRegister) => {
        delete item.__v;
        result.push(item);
      });
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static getRegisterById = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/register/${id}`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: IRegister = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static saveRegister = async (datayyy: IRegister, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/register`;
      
      const { data } = await axios.post(url, datayyy, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data save user == ", data);
      const result: IRegister = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static updateRegister = async (id: string, datayyy: IRegister, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/register/${id}`;
      
      const { data } = await axios.put(url, datayyy, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data update user == ", data);
      const result: IRegister = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static deleteRegister = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/register/${id}`;
      
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: IRegister = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
  
}
