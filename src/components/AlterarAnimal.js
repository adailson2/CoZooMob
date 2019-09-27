import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';
import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import MantemAnimalForm from './MantemAnimalForm';
import Alerta from '../util/Alerta.android';
import {bindActionCreators} from 'redux';
import {alterarAnimal} from '../actions';

class AlterarAnimal extends Component {
  static navigationOptions = ({navigation}) => ({
    header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Alterar Animal</Title>
        </Body>
        <Right />
      </Header>
    ),
  });
  handleAlterarAnimal = animal => {
    this.props
      .alterarAnimal(animal)
      .then(() => this.props.navigation.navigate('ListaAnimais'))
      .catch(err => Alerta.mensagem('Erro ao alterar animal: ' + err.message));
  };
  render() {
    const {navigation} = this.props;
    const animal = navigation.getParam('animal');
    return (
      <MantemAnimalForm animal={animal} onSubmit={this.handleAlterarAnimal} />
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({alterarAnimal}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlterarAnimal);
