import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.API_URL || "http://127.0.0.1:6869/api/";

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
}

export default new UserService();
