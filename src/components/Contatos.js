import React, { Component } from 'react';
import { View, Text, ListView, ListViewDataSource, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { contatosUsuariosFetch } from '../actions/AppActions';
import { _ } from 'lodash';
import { Actions } from 'react-native-router-flux';

class Contatos extends Component {

    componentWillMount(){
        this.props.contatosUsuariosFetch();
        this.criaFonteDeDados( this.props.contatos );
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados( nextProps.contatos );
    }

    criaFonteDeDados( contatos ) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.fonteDeDados = ds.cloneWithRows(contatos);
    }

    renderRow(contato) {
        return (
            <TouchableHighlight
                onPress={()=> Actions.conversa({title: contato.nome, contatoNome: contato.nome, contatoEmail: contato.email}) }
            >
                <View style={{ flex: 1, padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 20 }}>{contato.nome}</Text>
                    <Text style={{ fontSize: 14 }}>{contato.email}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render (){
        return (
            <ListView
                enableEmptySections
                dataSource={this.fonteDeDados}
                renderRow={this.renderRow}
            />
            
        );
    }
};

const mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return {...val, uid};
    });

    return {
        contatos
    };
}

export default connect(mapStateToProps, { contatosUsuariosFetch })(Contatos);