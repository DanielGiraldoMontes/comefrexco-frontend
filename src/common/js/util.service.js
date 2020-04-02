import _ from 'lodash';
import swal from 'sweetalert2';

// Custom class
import store from '../../store';

export default class UtilService {

    static storeDispatch(type, data) {
        let object = _.merge({
            type: type
        }, data);
        store.dispatch(object);
    }

    static getSession() {
        try {
            let sessionString = localStorage.getItem('session');
            let session = sessionString ? JSON.parse(localStorage.getItem('session')) : null;
            return session;
        } catch(error) {
            return null;
        }
    }

    static closeSession() {
        localStorage.setItem('session', '');
        store.dispatch({
            type: 'DO_LOGIN',
            session: null
        });
        window.location.href = "#/";
    }

    static confirmationDelete() {
        return new Promise((resolve, reject) => {
            swal.fire({
                title: '¿Estás seguro?',
                text: '¡No podrás revertir esto!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#008da4',
                cancelButtonColor: '#cccccc',
                confirmButtonText: '¡Sí, bórralo!',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.value) {
                    resolve();
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    reject();
                }
            });
        });
    }
}