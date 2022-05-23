import axios from "axios"
import { ICellStatus } from "../interfaces/cellStatus";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class CellStatusService {

  static getAllCellStatuses = async (setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/cellStatus`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: ICellStatus[] = [];
      (data || []).forEach((item: ICellStatus) => {
        delete item.__v;
        result.push(item);
      });
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static getCellStatusById = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/cellStatus/${id}`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: ICellStatus = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static saveCellStatus = async (dataCellStatus: ICellStatus, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/cellStatus`;
      
      const { data } = await axios.post(url, dataCellStatus, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data save user == ", data);
      const result: ICellStatus = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static updateCellStatus = async (id: string, dataCellStatus: ICellStatus, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/cellStatus/${id}`;
      
      const { data } = await axios.put(url, dataCellStatus, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data update user == ", data);
      const result: ICellStatus = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static deleteCellStatus = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/cellStatus/${id}`;
      
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
      const result: ICellStatus = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
  
}