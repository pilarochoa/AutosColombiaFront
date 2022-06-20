import axios from "axios"
import { IPayment } from "../interfaces/payment";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class PaymentService {

  static getAllPayments = async (setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/payment`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IPayment[] = [];
      (data || []).forEach((item: IPayment) => {
        delete item.__v;
        result.push(item);
      });
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static getPaymentById = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/payment/${id}`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IPayment = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static savePayment = async (dataPayment: IPayment, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/payment`;
      
      const { data } = await axios.post(url, dataPayment, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IPayment = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static updatePayment = async (id: string, dataPayment: IPayment, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/payment/${id}`;
      
      const { data } = await axios.put(url, dataPayment, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IPayment = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static deletePayment = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/payment/${id}`;
      
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IPayment = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
  
}