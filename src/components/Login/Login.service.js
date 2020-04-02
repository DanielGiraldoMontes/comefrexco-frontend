import axios from 'axios';
import { APIURL } from '../../common/js/enviroment'

export default class LoginService {

    static login(data) {
        return axios.post(APIURL + 'Login/Ingresar', data);
    }

}