import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Routes from './Routes';
import reducers from './reducers';

class App extends Component {

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyCq5MYTCpiDzFrKPnv95gB5ln-Dwfg3SSI",
            authDomain: "whatsapp-clone-3e004.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-3e004.firebaseio.com",
            projectId: "whatsapp-clone-3e004",
            storageBucket: "whatsapp-clone-3e004.appspot.com",
            messagingSenderId: "1003186462605"
        });
    }

    render() {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <Routes />
            </Provider>
        );
    }
};

export default App;