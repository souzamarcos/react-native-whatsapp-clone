import { 
    LISTA_USUARIO_CONTATO,

} from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LISTA_USUARIO_CONTATO:
            return action.payload;
        default:
            return state;
    }    
}