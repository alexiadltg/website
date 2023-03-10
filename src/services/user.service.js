import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://${window.location.hostname}:7378/api/`;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "public/landing");
  }

  getUserBoard() {
    return axios.get(API_URL + "user/userboard", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin/adminboard", { headers: authHeader() });
  }

  putAdminBoard(inputData){
    return axios.put(API_URL+"admin/updateUser", { inputData},{ headers:authHeader() });
  }

  deleteUserAdminBoard(deleteUserID){
   return axios.delete(API_URL+"admin/deleteUser", { data: { _id: deleteUserID }, headers: authHeader() });
  }
getPublicConfig() {
  return axios.get(API_URL +"public/config2");}

putGameSettings(inputData){
  return axios.put(API_URL+"admin/updateConfig", { inputData},{ headers:authHeader() });
}


}

export default new UserService();
