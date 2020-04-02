import axiosInstance from '../../common/js/axiosInstance';
import { APIURL } from '../../common/js/enviroment';

export default class UserService {

    static toList() {
        return axiosInstance.get(APIURL + 'Usuario/');
    }

    static toSave(params) {
        return axiosInstance.post(APIURL + 'Usuario/', params);
    }

    static toEdit(params) {
        return axiosInstance.put(APIURL + 'Usuario/' + params.userName, params);
    }

    static toChangePassword(params) {
        return axiosInstance.post(APIURL + 'Usuario/RestablecerClave/', params);
    }

    static toDelete(params) {
        return axiosInstance.delete(APIURL + 'Usuario/' + params.id);
    }

}