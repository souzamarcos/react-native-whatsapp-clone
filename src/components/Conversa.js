import React, { Component } from 'react';
import { View, Text, TextInput, ListView, ListViewDataSource, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions';
import { _ } from 'lodash';

class Conversa extends Component {

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
        this.criaFonteDados(this.props.conversa);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.contatoEmail != nextProps.contatoEmail){
            this.criaFonteDados([]);
            this.props.conversaUsuarioFetch(nextProps.contatoEmail);
        }
        this.criaFonteDados(nextProps.conversa);
    }

    criaFonteDados(conversa){
        const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !== r2 });

        this.dataSource = ds.cloneWithRows(conversa);
    }

    _enviarMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props;

        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail )
    }

    renderRow(texto) {
        if(texto.tipo == 'e'){
            return (
                <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40 }}>
                    <Text style={{ fontSize: 18, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: '#dbf5b4',elevation: 1 }}>{texto.mensagem}</Text>
                </View>
            );
        }

        return (
            <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40 }}>
                <Text style={{ fontSize: 18, paddingVertical: 7, paddingHorizontal: 10, backgroundColor: '#f7f7f7',elevation: 1 }}>{texto.mensagem}</Text>
            </View>
        );
    }

    render (){
        return (
            <View style={{ flex: 1, marginTop: 50, backgroundColor: '#eee4dc', padding: 10 }}>
                <View style={{ flex: 1, paddingBottom: 10 }}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                
                </View>
                <View style={{ flexDirection: 'row', height: 60 }}>
                    <TextInput 
                        value={this.props.mensagem}
                        onChangeText={text => this.props.modificaMensagem(text) }
                        style={{ flex: 4 , backgroundColor: '#fff', fontSize: 18 }}
                    />
                    <TouchableHighlight  
                        style={{ paddingLeft: 10 }} 
                        onPress={this._enviarMensagem.bind(this)}
                        underlayColor='#fff'                
                    >
                        <Image source={require('../imgs/enviar_mensagem.png')}/>
                    </TouchableHighlight>
                </View>
             </View>
        );
    }
};

const mapStateToProps = state => {

    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return {...val, uid};
    });

    return ({
        conversa,
        mensagem: state.AppReducer.mensagem
    });
}

 export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaUsuarioFetch })(Conversa);