import axios from "axios"
import { ITypeVehicle } from "../interfaces/typeVehicle";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class TypeVehicleService {

  static getAllTypeVehicles = async (setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/typeVehicle`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: ITypeVehicle[] = [];
      (data || []).forEach((item: ITypeVehicle) => {
        delete item.__v;
        result.push(item);
      });
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static getTypeVehicleById = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/typeVehicle/${id}`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: ITypeVehicle = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static saveTypeVehicle = async (dataTypeVehicle: ITypeVehicle, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/typeVehicle`;
      
      const { data } = await axios.post(url, dataTypeVehicle, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: ITypeVehicle = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static updateTypeVehicle = async (id: string, dataTypeVehicle: ITypeVehicle, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/typeVehicle/${id}`;
      
      const { data } = await axios.put(url, dataTypeVehicle, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: ITypeVehicle = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static deleteTypeVehicle = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/typeVehicle/${id}`;
      
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: ITypeVehicle = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
  
}