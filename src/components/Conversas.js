import React, { Component } from 'react';
import { View, Text, ListView, ListViewDataSource, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { conversasUsuarioFetch } from '../actions/AppActions';
import { _ } from 'lodash';
import { Actions } from 'react-native-router-flux';

class Conversas extends Component {

    componentWillMount(){
        this.props.conversasUsuarioFetch();
        this.criaFonteDados([]);
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDados(nextProps.conversas);
    }

    criaFonteDados(conversas) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.dataSource = ds.cloneWithRows(conversas);
    }

    renderRow(conversa){
        return (
            <TouchableHighlight
                onPress={()=> Actions.conversa({title: conversa.nome, contatoNome: conversa.nome, contatoEmail: conversa.email}) }
            >
                <View style={{ flex: 1, padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                    <Text style={{ fontSize: 20 }}>{conversa.nome}</Text>
                    <Text style={{ fontSize: 14 }}>{conversa.email}</Text>
                    <Text style={{ fontSize: 12, color: '#ccc'}}>{conversa.ultimaMensagem}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    const conversas = _.map(state.ListaConversasReducer, (val, uid) =>{
        return { ...val, uid };
    });

    return ({
        conversas
    });
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);