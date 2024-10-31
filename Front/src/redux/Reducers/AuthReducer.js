import { SIGN_IN, SIGN_OUT } from "../Actions/AuthActions";

const initialState = {
    isAuthenticated: false,
    user: {},
};

const AuthReducer = (state = initialState, type, payload) => {
    switch(type) {
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
            }
        case SIGN_OUT: 
            return {
                ...state,
                isAuthenticated: false,
                user: {},
            }
        default:
            return state;
    }
}

export default AuthReducer;