import axios from "axios"
import { IZone } from "../interfaces/zone";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class ZoneService {

  static getAllZones = async (setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/zone`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IZone[] = [];
      (data || []).forEach((item: IZone) => {
        delete item.__v;
        result.push(item);
      });
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static getZoneById = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/zone/${id}`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IZone = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }

  static saveZone = async (dataZone: IZone, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/zone`;
      
      const { data } = await axios.post(url, dataZone, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IZone = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static updateZone = async (id: string, dataZone: IZone, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/zone/${id}`;
      
      const { data } = await axios.put(url, dataZone, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IZone = data;
      return result;
    } catch (error) {
      console.log("error == ", error);
    }
  }

  static deleteZone = async (id: string, setIsLogin: Function) => {
    try {
      const token = getToken(setIsLogin);
      let url = `${REACT_APP_API}/api/zone/${id}`;
      
      const { data } = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      const result: IZone = data;
      return result;
    } catch (error) {
      console.log("error == ", error)
    }
  }
  
}