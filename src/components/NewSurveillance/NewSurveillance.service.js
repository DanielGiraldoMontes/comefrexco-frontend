import axiosInstance from '../../common/js/axiosInstance';
import { APIURL } from '../../common/js/enviroment';

export default class NewSurveillanceService {

    static toList() {
        return axiosInstance.get(APIURL + 'NuevoMonitoreo/');
    }

}