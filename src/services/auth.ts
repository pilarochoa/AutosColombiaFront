import axios from "axios"
import { IAuth } from "../interfaces/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

export class AuthService {

  static signIn = async (email: string, password: string)=> {
    let url = `${REACT_APP_API}/api/auth/signin`;      
    const { data } = await axios.post(url, {
      email: email,
      password: password
    }, {
      headers: {
        Accept: "application/json;odata=verbose"
      }  
    })
    console.log("data signIn == ", data);
    const result: IAuth = data;
    return result;
  }
}