import {Container, Header, Title} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import ListaAnimais from './components/ListaAnimais';
import configureStore from './configureStore';
import Login from './components/Login';
import Carregando from './components/Carregando';
import IncluirAnimal from './components/IncluirAnimal';
import AlterarAnimal from './components/AlterarAnimal';

const store = configureStore();

const AppNavigation = createStackNavigator(
  {
    Login,
    ListaAnimais,
    IncluirAnimal,
    AlterarAnimal,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: () => (
        <Header style={styles.header} androidStatusBarColor={'rgb(70,66,88)'}>
          <Title>Controle de Animais</Title>
        </Header>
      ),
    },
  },
);

const Navigation = createAppContainer(AppNavigation);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Navigation />
          <Carregando />
        </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  header: {height: 30, backgroundColor: 'rgb(70,66,88)'},
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginBottom: 10,
  },
});
