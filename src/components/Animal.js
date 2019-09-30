import {Body, Card, CardItem, Right, Icon} from 'native-base';
import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {favoritar, desfavoritar, excluirAnimal} from '../actions';
import BotaoFavoritar from './BotaoFavoritar';
import {bindActionCreators} from 'redux';

const {width} = Dimensions.get('screen');

class Animal extends Component {
  isFavoritado(animal, usuarioLogado) {
    return !!animal.favoritoUsuarios.find(usuario => usuario === usuarioLogado);
  }

  excluir(animal) {
    Alert.alert(
      'Atenção!',
      'Confirma a exclusão do animal ' + animal.nome + '?',
      [
        {text: 'OK', onPress: () => this.props.excluirAnimal(animal)},
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  }

  render() {
    const {animal, navigation} = this.props;

    return (
      <Card>
        <CardItem header button>
          <Text style={styles.nomeAnimal}>{animal.nome}</Text>
          <Right>
            <View style={styles.actionIconsContainter}>
              <TouchableOpacity
                style={styles.iconAlterar}
                onPress={() => navigation.navigate('AlterarAnimal', {animal})}>
                <Icon name="create" style={styles.icone} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.excluir(animal)}>
                <Icon name="trash" style={styles.icone} />
              </TouchableOpacity>
            </View>
          </Right>
        </CardItem>
        <CardItem bordered>
          <Body style={styles.imageContainer}>
            <Image
              source={{
                uri: animal.urlImagem,
              }}
              style={styles.imagemAnimal}
            />
          </Body>
        </CardItem>
        <CardItem footer bordered>
          <BotaoFavoritar
            favoritado={this.isFavoritado(animal, this.props.usuarioLogado)}
            favoritarCallback={() =>
              this.props.favoritar(animal, this.props.usuarioLogado)
            }
            desfavoritarCallback={() =>
              this.props.desfavoritar(animal, this.props.usuarioLogado)
            }
          />
          <Text>
            Este animal
            {animal.favoritoUsuarios.length > 1
              ? ` já foi favoritado por 
                ${animal.favoritoUsuarios.length} usuários`
              : animal.favoritoUsuarios.length === 1
              ? ` já foi favoritado por 
                ${animal.favoritoUsuarios.length} usuário`
              : ' ainda não foi favoritado'}
          </Text>
        </CardItem>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    animais: state.animais,
    usuarioLogado: state.usuarioLogado,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({favoritar, desfavoritar, excluirAnimal}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Animal);

const styles = StyleSheet.create({
  nomeAnimal: {fontSize: 18, fontWeight: 'bold'},
  imagemAnimal: {width: width * 0.7, height: width * 0.7, borderRadius: 30},
  icone: {fontSize: 30, color: 'black'},
  actionIconsContainter: {flexDirection: 'row'},
  iconAlterar: {marginRight: 10},
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
