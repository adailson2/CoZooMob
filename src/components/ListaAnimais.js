import {Container, Content, Header, Title} from 'native-base';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, FlatList} from 'react-native';
import Animal from './Animal';
import {
  animais as animaisData,
  usuarioLogado as usuarioLogadoData,
} from '../../data.json';

export default class ListaAnimais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animais: animaisData,
      usuarioLogado: usuarioLogadoData,
    };
  }
  favoritar = animal => {
    const {usuarioLogado} = this.state;

    let novoAnimal = {...animal};
    novoAnimal.favoritoUsuarios = [
      ...novoAnimal.favoritoUsuarios,
      usuarioLogado,
    ];
    this.atualizarAnimal(novoAnimal);
  };
  desfavoritar = animal => {
    const {usuarioLogado} = this.state;

    let novoAnimal = {...animal};

    novoAnimal.favoritoUsuarios = novoAnimal.favoritoUsuarios.filter(
      usuario => usuario !== usuarioLogado,
    );
    this.atualizarAnimal(novoAnimal);
  };
  atualizarAnimal(novoAnimal) {
    const novosAnimais = this.state.animais.map(a =>
      a._id === novoAnimal._id ? novoAnimal : a,
    );
    this.setState({animais: novosAnimais});
  }
  render() {
    const {animais, usuarioLogado} = this.state;
    return (
      <Container>
        <Header style={styles1.header} androidStatusBarColor="rgb(11,102,35)">
          <Title>Controle de Animais</Title>
        </Header>
        <Content padder>
          <FlatList
            data={animais}
            renderItem={({item}) => (
              <Animal
                animal={item}
                usuarioLogado={usuarioLogado}
                favoritarCallback={this.favoritar}
                desfavoritarCallback={this.desfavoritar}
              />
            )}
            keyExtractor={item => item.nome}
          />
        </Content>
      </Container>
    );
  }
}
const styles1 = StyleSheet.create({
  header: {
    height: 30,
    backgroundColor: 'rgb(11,102,35)',
  },
});
