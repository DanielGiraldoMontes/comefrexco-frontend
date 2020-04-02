import axios from 'axios';
import { APIURL } from '../../common/js/enviroment'

export default class PestService {

    static toList() {
        return axios.get(APIURL + 'pest/');
    }

}