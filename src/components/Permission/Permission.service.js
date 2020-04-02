import axios from 'axios';
import axiosInstance from '../../common/js/axiosInstance';
import { APIURL } from '../../common/js/enviroment';

export default class PermissionService {

    static multipleRequest(requests) {
        return axios.all(requests);
    }

    static getPermission(params) {
        return axiosInstance.post(APIURL + 'Usuario/Permisos/', params);
    }

    static denyPermission(params) {
        return axiosInstance.post(APIURL + 'Usuario/Permissions/Deny/', params);
    }

    static grantePermission(params) {
        return axiosInstance.post(APIURL + 'Usuario/Permissions/Grante/', params);
    }

}