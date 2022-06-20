import axios from "axios"
import { IRegister } from "../interfaces/register";
import { ITypeVehicle } from "../interfaces/typeVehicle";
import { getToken } from "../utils/auth";
import { TypeVehicleService } from "./typeVehicle";

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
      const result: IRegister = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static getPriceRegisterByPlaca = async (placa: string, setIsLogin: Function) => {
    try {
      let response = undefined;
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/register/placa/${placa}`;
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json;odata=verbose"
      };

      const { data } = await axios.get(url, {
        headers: headers  
      })
      const result: IRegister = data;
      if (result && result.typeVehicle) {        
        const typeVehicle: ITypeVehicle | undefined =
          await TypeVehicleService.getTypeVehicleById(result.typeVehicle.toString(), setIsLogin);
        response = typeVehicle?.tafifaMes;
      }
      return response;
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
      const result: IRegister = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
  
}
