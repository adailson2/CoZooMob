import {Container, Content, Header, Title} from 'native-base';
import React, {Component} from 'react';
import {View, Dimensions, StyleSheet, FlatList} from 'react-native';
import Animal from './Animal';

const {width} = Dimensions.get('screen');

export default class ListaAnimais extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animais: [
        {
          nome: 'Leão',
          urlImagem:
            'https://upload.wikimedia.org/wikipedia/commons/4/40/Just_one_lion.jpg',
          favoritoUsuarios: [],
        },
        {
          nome: 'Girafa',
          urlImagem:
            'https://upload.wikimedia.org/wikipedia/commons/9/97/Namibie_Etosha_Girafe_02.jpg',
          favoritoUsuarios: ['maria'],
        },
        {
          nome: 'Gato',
          urlImagem:
            'https://upload.wikimedia.org/wikipedia/commons/b/b2/WhiteCat.jpg',
          favoritoUsuarios: ['maria', 'paulo'],
        },
      ],
      usuarioLogado: 'jose',
    };
  }
  render() {
    const {animais, usuarioLogado} = this.state;
    return (
      <Container>
        <Header style={styles1.header}>
          <Title>Controle de Animais</Title>
        </Header>
        <Content padder>
          <FlatList
            data={animais}
            renderItem={({item}) => (
              <Animal animal={item} usuarioLogado={usuarioLogado} />
            )}
            keyExtractor={item => item.nome}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  nomeAnimal: {fontSize: 16},
  imagemAnimal: {width, height: width},
});

const styles1 = StyleSheet.create({
  header: {height: 30},
});
