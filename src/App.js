import {Container, Content, Header, Title} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import ListaAnimais from './components/ListaAnimais';
import configureStore from './configureStore';
import Login from './components/Login';
import Carregando from './components/Carregando';

const store = configureStore();

const AppNavigation = createStackNavigator(
  {
    Login,
    ListaAnimais,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: () => (
        <Header style={styles.header}>
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
  header: {height: 30},
  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginBottom: 10,
  },
});
