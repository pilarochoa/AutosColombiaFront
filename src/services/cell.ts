import axios from "axios"
import { ICell } from "../interfaces/cell";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class CellService {

  static getAllCells = async (setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/cell`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: ICell[] = [];
      (data || []).forEach((item: ICell) => {
        delete item.__v;
        result.push(item);
      });
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static getCellById = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/cell/${id}`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: ICell = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static saveCell = async (dataCell: ICell, setShowError: Function, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/cell`;
      
      const { data } = await axios.post(url, dataCell, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data save user == ", data);
      const result: ICell = data;
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

  static updateCell = async (id: string, dataCell: ICell, setShowError: Function, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/cell/${id}`;
      
      const { data } = await axios.put(url, dataCell, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data update user == ", data);
      const result: ICell = data;
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

  static deleteCell = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/cell/${id}`;
      
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: ICell = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
  
}