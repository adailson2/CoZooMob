import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';
import React, {Component} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

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
    console.warn('Atualizar animal: ', animal);
  };
  render() {
    const {navigation} = this.props;
    const animal = navigation.getParam('animal');
    return <Text>{animal.nome}</Text>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlterarAnimal);