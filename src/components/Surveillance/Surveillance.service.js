import axiosInstance from '../../common/js/axiosInstance';
import { APIURL } from '../../common/js/enviroment';

export default class SurveillanceService {

    static toList() {
        return axiosInstance.get(APIURL + 'Monitoreo/');
    }

}