import axiosInstance from '../../common/js/axiosInstance';
import { APIURL } from '../../common/js/enviroment';

export default class PeopleService {

    static toList() {
        return axiosInstance.get(APIURL + 'Personas/');
    }

    static toSave(params) {
        return axiosInstance.post(APIURL + 'Personas/', params);
    }

    static toEdit(params) {
        return axiosInstance.put(APIURL + 'Personas/' + params.id, params);
    }

    static toDelete(params) {
        return axiosInstance.delete(APIURL + 'Personas/' + params.id);
    }

}