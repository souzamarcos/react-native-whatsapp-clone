import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';

import { modificaAdicionaContatoEmail, adicionarContato } from '../actions/AppActions';

class AdicionarContato extends Component {

    renderAdicionaContato() {
        if(!this.props.cadastroResultadoInclusao){
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput 
                            placeholder='E-mail'
                            style={{ fontSize: 20, height: 45 }}
                            onChangeText={(texto) => { this.props.modificaAdicionaContatoEmail(texto) } }
                            value={this.props.adicionaContatoEmail}
                        />
                    </View>
            
                    <View style={{ flex: 1 }}>
                        <Button title="Adicionar" color='#115e54' onPress={ () => { this.props.adicionarContato(this.props.adicionaContatoEmail); }} />
                        <Text style={{ color: '#ff0000', fontSize: 20 }}>{this.props.cadastroResultadoErro}</Text>
                    </View>
               </View>
            );
        }else{
            return (
                <View>
                    <Text style={{ fontSize: 20, color: '#000' }}>
                        Cadastro realizado com sucesso!
                    </Text>
               </View>
            );
        }
    }

    render(){
        return (
            <View style={{ flex: 1, justifyContent: 'center',padding: 20 }}>
                { this.renderAdicionaContato() }
            </View>
        );
    }
};

const mapStateToProps = state => (
    {
        adicionaContatoEmail: state.AppReducer.adicionaContatoEmail,
        cadastroResultadoErro: state.AppReducer.cadastroResultadoErro,
        cadastroResultadoInclusao: state.AppReducer.cadastroResultadoInclusao,
    }
);

export default connect(
    mapStateToProps, 
    { 
        modificaAdicionaContatoEmail, 
        adicionarContato,
    })
(AdicionarContato)
