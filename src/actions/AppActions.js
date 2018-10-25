import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import { 
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    LISTA_USUARIO_CONTATO,
    MODIFICA_MENSAGEM,
    ENVIA_MENSAGEM_SUCESSO,
    LISTA_CONVERSA_USUARIO,
    LISTA_CONVERSAS_USUARIO
} from './types';

export const modificaAdicionaContatoEmail = (texto) => {
    
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto
    }
};

export const adicionarContato = (email) => {
    return dispatch => {
        let emailB64 = b64.encode(email);

        firebase.database().ref(`/contatos/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()){
                    const dadosUsuario = _.first(_.values(snapshot.val()));
                    console.log(dadosUsuario);

                    const { currentUser } = firebase.auth();

                    let emailUsuarioB64 = b64.encode(currentUser.email);

                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                        .push({ email, nome: dadosUsuario.nome })
                        .then(() => { adicionaContatoSucesso(dispatch); })
                        .catch(erro => { adicionaContatoErro(erro, dispatch) })
                }else{
                    
                }
            })
            .catch(erro => {
                dispatch({
                    type: ADICIONA_CONTATO_ERRO,
                    payload: erro.message
                });
            });
    };
};

export const habilitaInclusaoContato = () => ({
    type: ADICIONA_CONTATO_SUCESSO,
    payload: false
});

const adicionaContatoSucesso = (dispatch) => {
    dispatch({
        type: ADICIONA_CONTATO_SUCESSO,
        payload: true
    });
}


const adicionaContatoErro = (erro,dispatch) => {
    dispatch({
        type: ADICIONA_CONTATO_ERRO,
        payload: erro.message
    });
}

export const contatosUsuariosFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({
                    type: LISTA_USUARIO_CONTATO,
                    payload: snapshot.val()
                });
            })
    };
}

export const modificaMensagem = (texto) => {
    return {
        type: MODIFICA_MENSAGEM,
        payload: texto
    };
}

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {
    
    return (dispatch) => {

        const { currentUser } = firebase.auth();
        const usuarioEmail = currentUser.email;

        //conversao para b64
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}/`)
            .push({
                mensagem,
                tipo: 'e'
            })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}/`)
                    .push({
                        mensagem,
                        tipo: 'r'
                    })
                    .then(() => {
                        dispatch({
                            type: ENVIA_MENSAGEM_SUCESSO,
                            payload: mensagem
                        });
                    })
            })
            .then(() => {
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({
                        nome: contatoNome,
                        email: contatoEmail,
                        ultimaMensagem: mensagem,
                    })
            })
            .then(() => {
                firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                    .once("value")
                    .then(snapshot => {
                        const dadosUsuario = _.first(_.values(snapshot.val()));
                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                            .set({
                                nome: dadosUsuario.nome,
                                email: usuarioEmail,
                                ultimaMensagem: mensagem,
                            });
                    })
                    .catch(erro => {   
                    }); 
            })
            .catch(erro => {   
            });        
    }
};


export const conversaUsuarioFetch = (contatoEmail) => {

    return dispatch => {

        const {currentUser} = firebase.auth();

        let usuarioEmailB64 = b64.encode(currentUser.email);
        let contatoEmailB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}/`)
            .on("value", snapshot => {
                dispatch({
                    type: LISTA_CONVERSA_USUARIO,
                    payload: snapshot.val()
                });
            });
    };
};

export const conversasUsuarioFetch = () => {

    return dispatch => {

        const {currentUser} = firebase.auth();

        let usuarioEmailB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/`)
            .on("value", snapshot => {
                dispatch({
                    type: LISTA_CONVERSAS_USUARIO,
                    payload: snapshot.val()
                });
            });
    };
};