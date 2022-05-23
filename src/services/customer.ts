import axios from "axios"
import { ICustomer } from "../interfaces/customer";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class CustomerService {

  static getAllCustomers = async (setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/customer`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: ICustomer[] = [];
      (data || []).forEach((item: ICustomer) => {
        delete item.__v;
        result.push(item);
      });
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static getCustomerById = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/customer/${id}`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: ICustomer = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static saveCustomer = async (dataCustomer: ICustomer, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/customer`;
      
      const { data } = await axios.post(url, dataCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data save customer == ", data);
      const result: ICustomer = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static updateCustomer = async (id: string, dataCustomer: ICustomer, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/customer/${id}`;
      
      const { data } = await axios.put(url, dataCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data update customer == ", data);
      const result: ICustomer = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static deleteCustomer = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/customer/${id}`;
      
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: ICustomer = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
  
}