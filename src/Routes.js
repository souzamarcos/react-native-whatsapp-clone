import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { View, Text } from 'react-native';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas';
import Principal from './components/Principal';
import Conversa from './components/Conversa';

import reducers from './reducers';
import AdicionarContato from './components/AdicionarContato';

export default (props) => (
    <Router navigationBarStyle={{ backgroundColor: '#115e54' }} titleStyle={{ color: '#fff' }}>
        <Scene key='formLogin' component={FormLogin} title='Login' hideNavBar />
        <Scene key='formCadastro' component={FormCadastro} title='Cadastro' hideNavBar={false} />
        <Scene key='boasVindas' component={BoasVindas} title='Bem-Vindo'  hideNavBar />
        <Scene key='principal' component={Principal} title='Principal' hideNavBar />
        <Scene key='adicionarContato' component={AdicionarContato} title='Adicionar Contato' hideNavBar={false} />
        <Scene key='conversa' component={Conversa} title='Conversa' hideNavBar={false} />
    </Router>
);