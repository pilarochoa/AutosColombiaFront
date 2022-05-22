import axios from "axios"
import { IUser } from "../interfaces/user";
import { getToken } from "../utils/auth";

const REACT_APP_API = process.env.REACT_APP_API || "http://localhost:9000";

const token = getToken();

export class UserService {

  static getAllUsers = async () => {
    try {
      let url = `${REACT_APP_API}/api/users`;
      
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json;odata=verbose"
        }  
      })
      console.log("data == ", data);
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

  // static getAllFiles = async (token: string, idIniciative?: number) => {
  //   const ListUrlSections = ["MarcoTeorico","Implementacion","Resultado"];
  //   let resultItems: IDocument[] = [];
  //   if (idIniciative) {
      
  //   }
  //   for (const listItem of ListUrlSections) {
  //     let result = await this.getAllFilesBySection(token, listItem, idIniciative);
  //     resultItems.push(...result);
  //   }
  //   return resultItems;
  // }

  // static saveFile = async (
  //   token: string,
  //   requestdigest: string,
  //   fileTransform: any,
  //   name: string,
  //   section: string
  // ) => {
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     "x-requestdigest": requestdigest
  //   };
  //   const folderName =
  //       section === 'marcoTeorico' ? "MarcoTeorico" : 
  //       section === 'implementacion' ? "Implementacion" : "Resultado";
  //   const url = `${REACT_APP_TENANT_URL}/_api/web/getFolderByServerRelativeUrl('${folderName}')/files/add(overwrite=true,url='${name}')`;
  //   return axios
  //     .post(url, fileTransform, { headers });
  // }

  // static getListItemAllFields = async (token:string, url: string) => {
  //   return await axios
  //     .get(`${url}/ListItemAllFields`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     });
  // }

  // static updateItemFile = async (
  //   token: string,
  //   id: number,
  //   dataJson: object,
  //   requestdigest: string,
  //   section: string
  // ) => {
  //   const folderName =
  //       section === 'marcoTeorico' ? "MarcoTeorico" : 
  //       section === 'implementacion' ? "Implementacion" : "Resultado";
  //   const url = `${REACT_APP_TENANT_URL}/_api/web/lists/GetByTitle('${folderName}')/items(${id})`;
  //   return axios
  //     .post(url, dataJson, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "x-requestdigest": requestdigest,
  //         "X-HTTP-Method": "MERGE",
  //         "If-Match": "*"
  //       }
  //     });
  // }

  // static deleteItem = async (token:string, requestdigest: string, id: number, section: string) => {
  //   const folderName =
  //       section === 'marcoTeorico' ? "MarcoTeorico" : 
  //       section === 'implementacion' ? "Implementacion" : "Resultado";
  //   const url = `${REACT_APP_TENANT_URL}/_api/web/lists/GetByTitle('${folderName}')/items(${id})`;
  //   return axios
  //     .post(url, undefined, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "x-requestdigest": requestdigest,
  //         "X-HTTP-Method": "DELETE",
  //         "If-Match": "*"
  //       }
  //     });
  // }
}