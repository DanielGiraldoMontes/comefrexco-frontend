import { createStore } from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'DO_LOGIN':
            return {
                ...state,
                session: action.session
            }
        case 'PERMISSION_DATA':
            return {
                ...state,
                permissionData: action.permissionData
            }
        case 'TO_WAIT':
            return {
                ...state,
                blocking: action.blocking
            }
        default:
            return {};
    }
}

export default createStore(reducer, {
    session: null,
    permissionData: null,
    blocking: false,
});