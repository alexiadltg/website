import axios from "axios";
import authHeader from "./auth-header";


class UserService {
  getPublicContent() {
    return axios.get('http://deheroes-test.alumnes.inspedralbes.cat:6368/api/public/landing');
  }

  getUserBoard() {
    return axios.get( "http://deheroes-test.alumnes.inspedralbes.cat:6368/api/user/userboard", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get( "http://deheroes-test.alumnes.inspedralbes.cat:6368/api/admin/adminboard ", { headers: authHeader() });
  }
}

export default new UserService();
