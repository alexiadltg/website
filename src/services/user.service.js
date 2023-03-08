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

  putAdminBoard(Inputdata){
   return  axios.put(API_URL + "admin/updateUser",{ headers: authHeader() },Inputdata)
  }

  deleteUserAdminBoard(id){
    return axios.delete(API_URL +"admin/deleteUser",{headers: authHeader()},id)
  }
}

export default new UserService();
