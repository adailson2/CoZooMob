import {
  Button,
  Form,
  Input,
  Item as FormItem,
  Label,
  Content,
  Card,
  CardItem,
  Body,
} from 'native-base';
import React, {Component} from 'react';
import {StyleSheet, Text, Dimensions, Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../actions';
import Alerta from '../util/Alerta';
import {StackActions, NavigationActions} from 'react-navigation';

const {width} = Dimensions.get('screen');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: 'jose',
      senha: '123456',
    };
  }

  login = () => {
    this.props
      .login(this.state.usuario, this.state.senha)
      .then(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'ListaAnimais'})],
        });
        this.props.navigation.dispatch(resetAction);
      })
      .catch(() =>
        Alerta.mensagem('Verifique o usuário e senha e tente novamente.'),
      );
  };

  render() {
    return (
      <Content style={styles.contentStyle}>
        <Card>
          <Body style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Loggerhead_sea_turtle.jpg/250px-Loggerhead_sea_turtle.jpg',
              }}
              style={styles.imagemAnimal}
            />
          </Body>
        </Card>
        <Form>
          <FormItem floatingLabel>
            <Label style={styles.label}>Usuário</Label>
            <Input
              onChangeText={text => this.setState({usuario: text})}
              autoCapitalize="none"
              value={this.state.usuario}
              style={styles.inputColor}
            />
          </FormItem>
          <FormItem floatingLabel last>
            <Label style={styles.label}>Senha</Label>
            <Input
              secureTextEntry={true}
              onChangeText={text => this.setState({senha: text})}
              value={this.state.senha}
              style={styles.inputColor}
            />
          </FormItem>
          <Button full rounded style={styles.botaoLogin} onPress={this.login}>
            <Text style={styles.labelLogar}>Logar</Text>
          </Button>
        </Form>
      </Content>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({login}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

const styles = StyleSheet.create({
  botaoLogin: {marginTop: 10, backgroundColor: 'white'},
  contentStyle: {backgroundColor: 'rgb(24,187,133)'},
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(24,187,133)',
    marginTop: -10,
  },
  imagemAnimal: {width: width, height: width * 0.7},
  imageCardItem: {backgroundColor: 'rgb(24,187,133)'},
  label: {color: 'white', fontWeight: '900'},
  labelLogar: {color: 'rgb(24,187,133)', fontWeight: 'bold'},
  inputColor: {color: '#FFF'},
});
